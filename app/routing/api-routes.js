var path = require('path');
var cheerio = require('cheerio');
var request = require('request');


module.exports = function(app) {

    app.get("/", function(req, res) {
        request('https://news.ycombinator.com/', function(error, response, html) {
            var $ = cheerio.load(html);
            //console.log(response);
            $('.title').each(function(index) {

                var title = $(this).children('a').text();
                var link = $(this).children('a').attr('href');
                // console.log(title);
                // console.log(link);

            });
        });
          res.send("Scrape Complete");

});
};
