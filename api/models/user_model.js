var mongoose = require("mongoose");

var Schema = mongoose.schema;
var validate = mongoose.validate;

var UserSchema = new Schema({

	name: String,
	email: String,

	rdio: {

		token: String,

		index: {
			unique: true
		}
	}
});

mongoose.model("user", UserSchema);