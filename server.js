var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
// var mongoose = require('mongoose');
var path = require('path');

// App
var app = express();
var PORT = process.env.PORT || 80;


// Database
// mongoose.connect('mongod://');
// var db = mongoose.connection;

// db.on('error', function(err){
// 	console.log('mongoose:', err);
// });

// db.once('open', function(err){
// 	console.log('mongoose connected');
// });

// BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

//Public 
app.use(express.static(__dirname + '/public'));

// Routes
// require('./routing/api-routes.js')(app); 
require('./app/routing/html-routes.js')(app);

// Server
app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});




