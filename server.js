

var port = 3000;
var express = require('express');
var app = express();
var server = app.listen(port);
app.use(express.static('public')); //makes the folder "public" be used in express
console.log('connected via port ' + port);


var serveIndex = require('serve-index');
app.use(express.static('public'),serveIndex('public'));
