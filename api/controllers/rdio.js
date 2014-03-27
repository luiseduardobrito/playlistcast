var querystring = require("querystring");
var Rdio = require("../adapters/rdio");
var rdio = new Rdio(["xr4ee4jdsj3dnjhcdmauekht", "wqeGbj3tMT"]);

module.exports = {
	
	auth: function(req, res) {

		var params = querystring.stringify({
			method: 'get', 
			keys:  'a254895,a104386'
		});

		rdio.beginAuthentication("http://localhost:3000/api/rdio/callback", function(err, url) {

			if(err)
				res.json({
					result: "success",
					exception: err
				});

			else
				res.redirect(url);
		})
	},

	callback: function(req, res) {

		var credentials = {
			verifier: req.param("oauth_verifier"),
			token: req.param("oauth_token")
		};

		res.json({result: "success"});
	}
}