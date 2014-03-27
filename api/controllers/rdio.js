var querystring = require("querystring");
var Rdio = require("../adapters/rdio");

var APP_KEYS = ["xr4ee4jdsj3dnjhcdmauekht", "wqeGbj3tMT"];

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

				res.session.token = rdio.token[0];
				res.session.secret = rdio.token[1];

				res.redirect(url);
			}
		})
	},

	callback: function(req, res) {

		var credentials = [
			req.session.token,
			req.session.secret
		];

		var rdio = new Rdio(APP_KEYS. credentials);

		rdio.completeAuthentication(req.param("oauth_verifier"), function(err) {

			if(err) {
				res.json({
					result: "error",
					exception: err
				});
			}

			else {

				res.cookie("rdio_token", rdio.token[0]);
				res.cookie("rdio_secret", rdio.token[1]);

				res.json({
					result: "success"
				});
			}
		})		
	},

	current: function(req, res) {

		var credentials = [
			req.session.token,
			req.session.secret
		];	

		var rdio = new Rdio(APP_KEYS. credentials);

		rdio.call("currentUser", function(err, data) {

			if(err) {
				res.json({
					result: "error",
					exception: err
				});
			}

			else {

				res.json({
					result: "success",
					user: data
				});
			}
		})
	}
}