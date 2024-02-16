const mailer = require("../config/testMail");
const db = require("../models"); // models path depend on your structure
const User = db.users;

//jwt for authentication
const jwt = require('jsonwebtoken')
//crypto js for password encryption
const crypto = require('crypto-js')

exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const pass = JSON.stringify(crypto.SHA256(req.body.password))

  // Create a user
  const user = {
    userId: req.body.userId,
    username: req.body.username,
    password: pass,
    email: req.body.email,
    phone: req.body.phone,
    isAdmin: (req.body.email === "admin@gmail.com")
  };

  
 mailer.RegMail(req.body.email,"Successful Registration"," ","register" )
  // Save user in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User.",
        error: err
      });
    });
};

exports.getAllUser = (req, res) => {
  User.findAll({
    where: { isAdmin: false }
  })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with id=" + userId,
        error: err
      });
    });
};

exports.login = (req, res) => {
  const email = req.body.email;
  const password = JSON.stringify(crypto.SHA256(req.body.password));
  User.findAll({
    where: {
      email: email,
      password: password
    }
  })
    .then(data => {
      const user = data[0]
      const token = jwt.sign({ id: user['id'] }, '1234566sdffdfgfdg')

      const Data = {
        email: user['email'],
        username: user['username'],
        isAdmin: user['isAdmin'],
        token: token
      }
      res.send(Data)
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with email=" + email,
        error: err
      });
    });
};

exports.forgotPassword = (req, res) => {
  const min = 10000
  const max = 99999
  const Otp = Math.floor(Math.random() * (max - min) + min)

  //seding otp through mail
  mailer.RegMail(req.body.email, "Bestify !! Password Reset Otp : " + Otp, "<div>Welcome to Bestify</div><h3>Otp For reseting Password is </h3>", "changepassword")

  const data = {
    BackendOtp: Otp
  }
  res.send(data);
};

exports.resetPassword = (req, res) => {
  const email = req.body.email
  const password = JSON.stringify(crypto.SHA256(req.body.password));

  // need update password by put query 
  User.update({
    password: password
  },
    { where: { email: email } }
  )
    .then(data => {
      res.send(data)
    })
};

exports.getUserByUserId = (req, res) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with id=" + userId,
        error: err
      });
    });
};

exports.deleteUserById = (req, res) => {
  const userId = req.params.userId;


  if (!req.params.userId) {
    res.status(400).send({
      message: "userId can not be empty!"
    });
    return;
  }
  User.destroy({
    where: { userId: userId }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: "user was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete user with id=${userId}. Maybe user was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete user with id=" + userId,
        error: err
      });
    });
};

exports.deleteUserByName = (req, res) => {
  const username = req.body.username;
  if (!req.body.username) {
    res.status(400).send({
      message: "username can not be empty!"
    });
    return;
  }
  User.destroy({
    where: { username: username }
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
        error: err
      });
    });
};

exports.getAdminDetails = (req, res) => {
  const email = req.params.email;

  User.findAll({
    Where: { email: email }
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
