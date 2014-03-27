'use strict';

var config = require('../../config/settings').db;

var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

// Load models
var src = path.join(__dirname, '../models');
fs.readdirSync(src).forEach(function (file) {
  require(path.join(src, file));
});

// Basic exports
module.exports.schema = mongoose.Schema;
module.exports.validate = require('mongoose-validator').validate;
module.exports.model = function (name) {
  return mongoose.model(name);
};

// Create the connection
var url = config.protocol + config.user + (config.password ? ':' + config.password : '');
url += '@' + config.host + ':' + (config.port || 27017);
url += '/' + (config.db || '');

mongoose.connect(url);