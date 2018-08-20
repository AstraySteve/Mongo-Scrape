//HTML ROUTES
const db = require("../models");
const request = require('request');
//Scraping tool
const cheerio = require('cheerio');

module.exports =(app)=>{
    //home page
    app.get("/",(req, res)=>{
        res.render("index",{customScript: '/js/index.js'});
    });

    //get/ scrape articles
    app.get("/scrape", (req, res)=>{
        request("https://myanimelist.net/news",(error,result,html)=>{
            let $ = cheerio.load(html);
            
            $("div.news-unit-right").each((i,element)=>{
                let title = $(element).children($('p.title')).children().text();
                let link = $(element).children($('p.title')).children().attr("href");
                let summary = $(element).children($('div.text')).text();

                let result = {
                    title: title,
                    link: link,
                    summary: summary.trim()
                }

                //Create a new Article using the 'result' object
                db.Article.create(result).then((dbArticle)=>{
                    //log result in console
                    console.log(dbArticle);
                }).catch((err)=>{
                   res.json(err);
                });
            });
        });
        res.send("scrape complete");
    });

    //Route for getting all Articles from the db
    app.get("/articles", (req,res)=>{
        //Grab every document in the Articles collection
        db.Article.find({}).then((dbArticle)=>{
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
};