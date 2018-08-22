//HTML ROUTES
const db = require("../models");
const request = require('request');
//Scraping tool
const cheerio = require('cheerio');

module.exports =(app)=>{
    //get/ scrape articles
    app.get("/scrape", (req, res)=>{
        request("https://myanimelist.net/news",(error,result,html)=>{
            let $ = cheerio.load(html);
            
            $("div.news-unit-right").each((element)=>{
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
            res.send("Scrape Complete");
        });
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

    //Route for deleting all documents
    app.delete("/clearAll", (req,res)=>{
        db.Article.deleteMany({},(err)=>{
            if(err){
                return res.json(err);
            }
        });
    })
};