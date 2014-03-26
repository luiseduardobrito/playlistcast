"use strict";

/*
    Application Dependencies
 */
var express = require('express');
var app = express();

// New call to compress content
app.use(express.compress());
app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 3000);
console.log("Express server listening on port 3000");