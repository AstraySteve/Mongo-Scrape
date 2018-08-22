/*
    Steven Tran
    Mongo-Scrape, 2018
    UofT SCS Coding Bootcamp
*/

//Imports
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const exphbs  = require('express-handlebars');

let PORT = 3000;

//Init Express
const app = express();

//body-parser
app.use(bodyParser.urlencoded({extended:true}));
//express.static to serve public folder as static directory
app.use(express.static("public"));

//Connect to Mongo DB
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//Set mongoose to Leverage built in JavaScript ES6 Promises
//Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Handlebars
app.engine("handlebars",exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//Start the server
app.listen(PORT, function(){
    console.log(`App running on port ${PORT}!`);
});