const mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

//Construct Schema
let ArticleSchema = new Schema({
    //'Title' is required and of type String
    title: {
        type: String,
        required: true,
    },
    //'link' is required and of type String
    link: {
        type: String,
        required: true
    },
    //'summary' is of type String
    summary: {
        type: String
    },
    //'isSaved' is of type Boolean, determind if articled is saved already
    isSaved: {
        type: Boolean,
        default: false
    },
    //'note' is an object that stores a Note id
    note: [
        {
            type: Schema.Types.ObjectId,
            ref: "Note"
        }
    ]
});

// This creates our model from the above schema, using mongoose's model method
let Article = mongoose.model("Article", ArticleSchema);

//Export the model
module.exports = Article;