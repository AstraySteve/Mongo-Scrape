//HTML ROUTES
var db = require("../models");
const request = require('request');
//Scraping tool
const cheerio = require('cheerio');

module.exports = function(app){
    //home page
    app.get("/", function(req, res){
        res.render("index");
    });
};