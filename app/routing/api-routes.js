var path = require('path');
var cheerio = require('cheerio');
var request = require('request');

var Note = require('../models/Note.js');
var Article = require('../models/Article.js');


module.exports = function(app) {

app.get('/scrape', function(req, res) {
  request('https://www.npmjs.com/browse/star', function(error, response, html) {
    var $ = cheerio.load(html);
    $('div.package-details').each(function(i, element) {

                var result = {};

                result.title = $(this).find('h3').text();
                result.desc = $(this).find('p.description').text();
                result.link = $(this).find('a.name').attr('href');

                var entry = new Article (result);

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

   app.get('/articles', function(req, res){
    Article.find({}, function(err, doc){
        if (err){
            console.log(err);
        } else {
            res.json(doc);
        }
    });
});


app.get('/articles/:id', function(req, res){
    Article.findOne({'_id': req.params.id})
    .populate('note')
    .exec(function(err, doc){
        if (err){
            console.log(err);
        } else {
            res.json(doc);
        }
    });
});


app.post('/articles/:id', function(req, res){
    var newNote = new Note(req.body);

    newNote.save(function(err, doc){
        if(err){
            console.log(err);
        } else {
            Article.findOneAndUpdate({'_id': req.params.id}, {'note':doc._id})
            .exec(function(err, doc){
                if (err){
                    console.log(err);
                } else {
                    res.send(doc);
                }
            });

        }
    });
});

};
