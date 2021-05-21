const mongoose = require("mongoose");

const suggestionSchema = mongoose.Schema({
    uid: String,
    username: String,
    suggestion: String,
}, { timestamps: true })

module.exports = mongoose.model("Suggestion", suggestionSchema);