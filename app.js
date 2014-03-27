"use strict";

/*
    Application Dependencies
 */
var express = require('express');
var api = require("./api");

var app = express();

// New call to compress content
app.use(express.compress());
app.use(express.static(__dirname + '/public'));

api.router(app);

app.listen(process.env.PORT || 3000);
console.log("Express server listening on port 3000");