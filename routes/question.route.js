const express = require("express");
const questionController = require("../controller/question.controller");
const { route } = require("./user.route");
const router = express.Router();

/// /api/question
router.get("",questionController.getAllQuestions);

/// /api/question
router.post("",questionController.createQuestion);

/// /api/question
router.delete("/questionid/:questid",questionController.deleteQuestionById);
/// /api/question---delete
router.post("/quizname",questionController.deleteQuestionByQuizname);
/// /api/question
router.get("/questionid/:questid",questionController.getQuetionByid);

/// /api/question
router.get("/quizname/:quizname",questionController.getQuetionByQuizName);

/// /api/question
router.post("/groupquiz/category",questionController.getQuetionByQuizCategory);

/// /api/question
router.get("/category/:category",questionController.getQuetionByCategory);

router.get("/questions/:quizname",questionController.getQuetionByQuizName);

router.get("/groupby/quizname",questionController.getQuetionGroupByQuizName);

router.put("/updatedata",questionController.updateQuestions);
module.exports=router;