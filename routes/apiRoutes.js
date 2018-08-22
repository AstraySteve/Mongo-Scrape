//HTML ROUTES
const db = require("../models");
const request = require('request');
//Scraping tool
const cheerio = require('cheerio');

module.exports =(app)=>{
    /*api routes for Articles*/
    //get/ scrape articles
    app.get("/scrape", (req, res)=>{
        request("https://myanimelist.net/news",(error,result,html)=>{
            let $ = cheerio.load(html);
            
            $("div.news-unit-right").each((i,element)=>{
                let title = $(element).children($('p.title')).children().text();
                let link = $(element).children($('p.title')).children().attr("href");
                let summary = $(element).children($('div.text')).text();

                let scrapedData = {
                    title: title,
                    link: link,
                    summary: summary.trim()
                }

                //Create a new Article using the 'result' object
                db.Article.create(scrapedData).then((dbArticle)=>{
                    console.log(dbArticle);
                }).catch((err)=>{
                    return res.json(err);
                });
            });
            res.render("index",{customScript: '/js/index.js'});
        });
    });

    //Route for getting all non saved Articles from the db
    app.get("/articles", (req,res)=>{
        //Grab every document in the Articles collection
        db.Article.find({isSaved: false}).then((dbArticle)=>{
            //If successful
            res.json(dbArticle);
        }).catch((err)=>{
            //If error occured on retrevial
            res.json(err);
        });
    });

    //Route for getting all saved Articles from the db
    app.get("/saved-articles", (req,res)=>{
        //Grab every document in the Articles collection
        db.Article.find({isSaved: true}).then((dbArticle)=>{
            //If successful
            res.json(dbArticle);
        }).catch((err)=>{
            //If error occured on retrevial
            res.json(err);
        });
    });

    //Route for getting a specific Article by id, populate it with it's note
    app.get("/articles/:id", (req,res)=>{
        db.Article.findOne({_id:req.params.id})
            .populate("note")
            .then((dbArticle)=>{
                //If successful
                res.json(dbArticle);
            }).catch((err)=>{
                res.json(err);
            });
    });

    //Route for updating article boolean
    app.put("/articles/:id", (req,res)=>{
        db.Article.findOneAndUpdate({_id: req.params.id}, {isSaved: req.body.isSaved}, (err, result)=>{
            if(err){
                res.json(err);
            }
            res.json(result);
        });
    });

    //Route for deleting all documents
    app.delete("/clearAll", (req,res)=>{
        db.Article.deleteMany({},(err)=>{
            if(err){
                return res.json(err);
            }
            db.Note.deleteMany({},(err)=>{
                if(err){
                    return res.json(err);
                }
                res.render("index",{customScript: '/js/index.js'});
            });
        });
    });

    /*api routes for Note*/
    // Route for saving/updating an Article's associated Note
    app.post("/articles/:id", (req, res)=> {
        // Create a new note and pass the req.body to the entry
        db.Note.create(req.body)
        .then(function(dbNote) {
            // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { note: dbNote._id } }, { new: true });
        })
        .then(function(dbArticle) {
            // If we were able to successfully update an Article, send it back to the client
            res.json(dbArticle);
        })
        .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
    });

    //Route for deleting a Note
    app.delete("/note/:id", (req,res)=>{
        db.Note.deleteOne({_id: req.params.id}, (err)=>{
            if(err){
                return res.json(err);
            }
        })
    })
};