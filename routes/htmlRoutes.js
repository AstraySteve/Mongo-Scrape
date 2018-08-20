//HTML ROUTES
const db = require("../models");
const request = require('request');
//Scraping tool
const cheerio = require('cheerio');

module.exports =(app)=>{
    //home page
    app.get("/",(req, res)=>{
        res.render("index");
    });

    //get/ scrape articles
    app.get("/scrape", (req, res)=>{
        request("https://myanimelist.net/news",(error,res,html)=>{
            let $ = cheerio.load(html);
            let result = []
            $("div.news-unit-right").each((i,element)=>{
                let title = $(element).children($('p.title')).children().text();
                let link = $(element).children($('p.title')).children().attr("href");
                let summary = $(element).children($('div.text')).text();

                result.push({
                    title: title,
                    link: link,
                    summary: summary.trim(),
                });

                //Create a new Article using the 'result' object
            });
            console.log(result);
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
};