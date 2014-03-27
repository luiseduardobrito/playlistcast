module.exports = {

	"prefix": "/api",

	"get": {

		"/rdio/auth": {

			controller:"rdio",
			method: "auth",

			filters: []
		},

		"/rdio/callback": {

			controller: "rdio",
			method: "callback",

			filter: []
		},

		"/user/me": {

			controller: "user",
			method: "me",

			filter: []
		}
	},

	post: {}
}
