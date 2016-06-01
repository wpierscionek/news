var path = require('path');
var cheerio = require('cheerio');
var request = require('request');

var Note = require('../models/Note.js');
var Article = require('../models/Article.js');


module.exports = function(app) {

    app.get('/scrape', function(req, res) {
        request('http://www.echojs.com/', function(error, response, html) {
            var $ = cheerio.load(html);
            $('article h2').each(function(i, element) {

                var result = {};

                result.title = $(this).children('a').text();
                result.link = $(this).children('a').attr('href');

                var entry = new Article(result);

                entry.save(function(err, doc) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(doc);
                    }
                });


            });
        });
        res.send("Scrape Complete");
    });

};
