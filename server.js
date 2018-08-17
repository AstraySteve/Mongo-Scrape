/*
    Steven Tran
    Mongo-Scrape, 2018
    UofT SCS Coding Bootcamp
*/

//Imports
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const request = require('request');
var exphbs  = require('express-handlebars');

//Scraping tool
const cheerio = require('cheerio');

var PORT = 3000;

//Init Express
const app = express();

//body-parser
app.use(bodyParser.urlencoded({extended:true}));
//express.static to serve public folder as static directory
app.use(express.static("public"));