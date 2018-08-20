const mongoose = require("mongoose");

//Save a reference to the Schema constructor
let Schema = mongoose.Schema;

//Construct Schema
let NoteSchema = new Schema({
    //'body' is of type String
    body: String
});

//Create our model from the above schema, using mongoose model method
var Note = mongoose.model("Note", NoteSchema);

//Export the Note model
module.exports = Note;