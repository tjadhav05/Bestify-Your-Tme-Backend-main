const { response } = require("express");
const mailer = require("../config/testMail");
const db = require("../models");
const Score = db.score;


exports.CreateScore = (req, res) => {

  const ScoreLog = {
    score: req.body.score,
    quizname: req.body.quizname,
    username: req.body.username
  };

  mailer.RegMail(req.body.username, "You Have just completed "+req.body.quizname+" Quiz and You have Scored : " + req.body.score + " Marks", "","scores")
 
  // Save user in the database
  Score.create(ScoreLog)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Scorelog"
      });
      res.status(404).send({
        message:
          err.message || "Some error occurred while creating the Scorelog."
      })
    });
};


exports.getTopScoreByQuiz = (req, res) => {
  const quizName = req.body.quizname;

  Score.findAll({
    //Find Top Score by using Max() function from Mysql
    attributes: [[db.sequelize.fn('max', db.sequelize.col('score')), 'maxScore'], 'quizname', 'username', 'scoreId'],
    //retrive score by adding where clause
    where: { quizname: quizName },
    raw: true,
  })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving score=" + err
      });
    });
};

exports.getAllTopScoreByQuiz = (req, res) => {
  const quizName = req.body.quizname;
  Score.findAll({
    attributes: ['score', 'quizname', 'username', 'scoreId'],
    //retrive score by adding where clause
    where: { quizname: quizName},
    //added order clause to return data in descending order
    order: [['score', 'DESC']]
  })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving score=" + err
      });
    });
};