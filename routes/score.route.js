const express = require("express");
const scoreController = require("../controller/score.controller");
const router = express.Router();

//Api's Score

// /api/score
router.post("",scoreController.CreateScore);
router.post("/highscore",scoreController.getTopScoreByQuiz);
router.post("/allTopScores/getall",scoreController.getAllTopScoreByQuiz);

module.exports=router;
