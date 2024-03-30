const db = require("../models");
const User = db.user;
var sanitizer = require('sanitize')();

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

// USER

exports.userInfo = (req, res) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.status(200).send({
      success: true,
      result: {
        user: {
          id: user._id,
          name: "123",
          surname: "321",
          userName: user.username,
          emailAddress: user.email,
          defaultCurrencyCode: user.defaultCurrencyCode
        }
      }
    });
  });
}

exports.changeDefaultCurrency = (req, res) => {
  var conditions = {
    _id : req.userId
  }

  var update = {
    defaultCurrencyCode: req.body.currencyCode
  }

  User.findOneAndUpdate(conditions, update, function(err, result) {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.status(200).send({
      success: true
    });
  });
}

exports.userSettings = (req, res) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.status(200).send({
      success: true,
      result: {
        defaultCurrencyCode: user.defaultCurrencyCode
      }
    });
  });
}