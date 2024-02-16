const { response } = require("express");
const db = require("../models");
const favourite = db.fav;


//Add favourite
exports.AddtoFav = (req, res) => {

  const Fav = {
    username: req.body.username,
    quizname: req.body.quizname,
  };

  // Save Favourite in the database
  favourite.create(Fav)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Fav."
      });
      res.status(404).send({
        message:
          err.message || "Some error occurred while creating the Fav."
      })
    });
};

//Delete favourite
exports.deleteFav = (req, res) => {
  const username = req.params.username;
  const quizname = req.params.quizname;
  if (!req.params.username) {
    res.status(400).send({
      message: "username can not be empty!"
    });
    return;
  }
  favourite.destroy({
    where: { username: username, quizname: quizname }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: "user was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete user with name=${username}. Maybe user was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete user with name=" + username,
        err: err
      });
    });
};

//Get Question by username
exports.getQuetionByUsername = (req, res) => {

  const username = req.params.username

  favourite.findAll({
    //retrive question by adding where clause
    where: { username: username },
  })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with id=" + err
      });
    });
};