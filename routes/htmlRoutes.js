//HTML ROUTES
var db = require("../models");
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
            var $ = cheerio.load(html);
            var results = []
            $("div.news-unit-right").each((i,element)=>{
                var title = $(element).children($('p.title')).children().text();
                var link = $(element).children($('p.title')).children().attr("href");
                var summary = $(element).children($('div.text')).text();

                results.push({
                    title: title,
                    link: link,
                    summary: summary.trim(),
                });
            });
            console.log(results);
        });
        res.send("scrape complete");
    });
};