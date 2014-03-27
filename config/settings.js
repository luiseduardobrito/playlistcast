var settings = {

	state: "development",

	development: {

		port: 3000,

		db: {

			protocol: "mongodb://",

			host: "localhost",
			db: "playlistcast",
			
			user: "root",
			password: "" 
		}
	}
}

module.exports = settings[settings.state];