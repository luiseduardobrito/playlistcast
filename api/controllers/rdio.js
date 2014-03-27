var querystring = require("querystring");

var mongoose = require("../services/mongoose");
var User = mongoose.model("user");

var Rdio = require("../adapters/rdio");
var APP_KEYS = ["q4svkj3f5peqckec29sxexmg", "d8TfYRczkB"];

module.exports = {
	
	auth: function(req, res) {

		var rdio = new Rdio(APP_KEYS);

		rdio.beginAuthentication("http://localhost:3000/api/rdio/callback", function(err, url) {

			if(err)
				res.json({
					result: "success",
					exception: err
				});

			else {

				req.session.token = rdio.token[0];
				req.session.secret = rdio.token[1];

				res.redirect(url);
			}
		})
	},

	callback: function(req, res) {

		var credentials = [
			req.session.token,
			req.session.secret
		];

		var rdio = new Rdio(APP_KEYS, credentials);

		rdio.completeAuthentication(req.param("oauth_verifier"), function(err) {

			if(err) {
				res.json({
					result: "error",
					exception: err
				});
			}

			else {

				req.session.rdio = {
					token: rdio.token[0],
					secret: rdio.token[1]
				}

				rdio.call("currentUser", function(err, data) {

					if(err || data.status !== "ok") {
						res.json({
							result: "error",
							exception: err
						});
					}

					else {

						var rdio_user = data.result;

						User.rdioAuthentication(rdio_user.key, {

							name: {
								first: rdio_user.firstName,
								last: rdio_user.lastName,
							},

							email: null,
							rdio_key: rdio_user.key,
							images: [
								{ size: 500, url: rdio_user.icon500 },
								{ size: 250, url: rdio_user.icon250 },
							],

							uri: rdio_user.url,
							gender: rdio_user.gender

						}, function(err, me) {

							if(err) {
								res.json({
									result: "error",
									exception: err
								});
							}

							else {

								req.session.user = me;
								res.redirect("/api/user/me")
							}

						})
					}
				})
			}
		})
	}
}