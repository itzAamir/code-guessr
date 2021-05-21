const mongoose = require("mongoose");

const scoreSchema = mongoose.Schema({
    uid: String,
    username: String,
    score: Number,
}, { timestamps: true })

module.exports = mongoose.model("Score", scoreSchema);