var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var validate = mongoose.validate;

var UserSchema = new Schema({

	name: {

		first: {
			type: String,
			required: true
		},

		last: String
	},

	email: String,

	images: [{
		size: Number,
		url: String
	}],

	uri: String,

	gender: {
		type: String,
		enum: ["m", "f"]
	},

	rdio_key: {

		required: true,
		type: String,

		index: {
			unique: true
		}
	}

}, {
	toObject: {
		virtuals: true
	}
});


UserSchema
	.virtual("name.full")
	.get(function(){
		return (this.name.first + (this.name.last ? " " + this.name.last : ""));
	})

UserSchema.statics.rdioAuthentication = function(key, info, fn) {

	fn = fn || function(){};
	var that = this;

	that.find({

		rdio_key: key

	}, function(err, docs) {

		if(err) {
			return fn(err)
		}

		else if(docs && docs.length) {
			fn(null, docs[0])
		}

		else {

			var user = new that(info);

			user.save(function(err) {
				if(err) return fn(err);
				else return fn(null, user);
			})
		}
	})
}

UserSchema.methods.toJSON = function() {

	var obj = this.toObject();

	delete obj.__v;

	obj.id = obj._id;
	delete obj._id;

	for(var i = 0; i < obj.images.length; i++) {

		if(obj.images[i]._id)
			delete obj.images[i]._id

		if(obj.images[i].id)
			delete obj.images[i].id
	}

	return obj;
}

mongoose.model("user", UserSchema);