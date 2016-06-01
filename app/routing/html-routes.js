var path = require('path');
var cheerio = require('cheerio');
var request = require('request');

module.exports = function(app) {

    app.get('/', function(req, res) {
    	request('https://news.ycombinator.com/', function(error, response, html){
    		var $ = cheerio.load(html);
    		console.log(response);
    	})
    	})
};

