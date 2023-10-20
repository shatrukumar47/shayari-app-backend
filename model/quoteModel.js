const mongoose = require("mongoose");

const quoteSchema = mongoose.Schema({
    type: {type: String, required: true},
    body: {type: String, required: true},
    userID: {type: String, required: true},
    username: {type: String, required: true},

},{
    versionKey : false
});

const QuoteModel = mongoose.model("quote", quoteSchema);

module.exports = {
    QuoteModel
}