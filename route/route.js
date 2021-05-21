const express = require("express");
const router = express.Router();
const Scores = require("../models/Score");
const Suggestion = require("../models/Suggestion");

router.get("/top-scorers", (req, res) => {
    Scores.find().sort({ score: "desc" }).limit(10).exec((err, result) => {
        if (err) {
            res.json({ message: "error", data: err.message })
            return;
        }
        res.json({ message: "ok", data: result });
    })
})

router.post("/top-scorer", async (req, res) => {
    const { uid, username, score } = req.body;

    // If user exist
    const user = await Scores.find({ uid });
    if (user.length !== 0) {
        try {
            const updatedScore = await Scores.findByIdAndUpdate(user[0]._id, { score }, { new: true })
            res.json({ message: "ok", data: updatedScore });
        } catch (err) {
            res.json({ message: "error", data: err.message });
        }
        return;
    }

    // For New User
    const newUser = new Scores({ uid, username, score });
    try {
        const result = await newUser.save();
        res.json({ message: "ok", data: result })
    } catch (err) {
        res.json({ message: "error", data: err.message })
    }
})

router.post("/suggestion", async (req, res) => {
    const { uid, username, suggestion } = req.body;
    let newSuggestion = new Suggestion({ uid, username, suggestion });
    try {
        let result = await newSuggestion.save();
        res.json({ message: "ok", data: result });
    } catch (error) {
        res.json({ message: "error", data: error.message });
    }
})

module.exports = router;