var mongoose = require("../services/mongoose");
var User = mongoose.model("user");

module.exports = {

	me: function(req, res) {

		User.find({

			_id: req.session.user.id

		}, function(err, docs) {

			if(err || !docs.length) {
				res.json({
					result: "error",
					exception: err
				})
			}

			else {
				res.json({
					result: "success",
					user: docs[0]
				})
			}

		})
	}
}