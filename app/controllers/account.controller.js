const db = require("../models");
const Account = db.account;
const currencyRepository = require('../repositories/currencies.repository');
const accountTypesRepository = require('../repositories/account-types.repository');

exports.create = (req, res) => {
  const account = new Account({
    userId: req.userId,
    name: req.body.name,
    currencyId: req.body.currencyId,
    accountTypeId: req.body.accountTypeId,
    isArchived: req.body.isArchived,
    currentBalance: 0
  });

  account.save((err, account) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ 
      success: true
    });
  });
};

exports.list = (req, res) => {
  Account.find({
    userId: req.userId
  }).exec((err, accounts) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    let result = [];
    try {
      result = accounts.map(account => {
        const currency = currencyRepository.items.find((currency) => currency.id == account.currencyId);
        const accountType = accountTypesRepository.items.find((accountType) => accountType.id == account.accountTypeId);

        return {
          id: account.id,
          name: account.name,
          accountType: accountType.name,
          currency: {
            symbol: currency.symbol,
            code: currency.code
          },
          currentBalance: (account.currentBalance ?? 0).toFixed(2),
          isArchived: account.isArchived ?? false
        }
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
      return;
    }
    
    res.status(200).send({
      success: true,
      result: {accounts: result}
    });
  });
}

exports.show = (req, res) => {
  Account.findById(req.params.id).exec((err, account) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    let result = null;
    try {
        const currency = currencyRepository.items.find((currency) => currency.id == account.currencyId);
        const accountType = accountTypesRepository.items.find((accountType) => accountType.id == account.accountTypeId);

        result = {
          id: account.id,
          name: account.name,
          accountTypeId: account.accountTypeId,
          accountType: accountType.name,
          currencyId: account.currencyId,
          currency: {
            symbol: currency.symbol,
            code: currency.code
          },
          currentBalance: (account.currentBalance ?? 0).toFixed(2),
          isArchived: account.isArchived ?? false
        }
    } catch (err) {
      res.status(500).send({ message: err.message });
      return;
    }
    
    res.status(200).send({
      success: true,
      result: result
    });
  });
}

exports.update = (req, res) => {
  var conditions = {
    _id : req.params.id,
    userId: req.userId
  }

  var update = {
    name: req.body.name,
    currencyId: req.body.currencyId,
    accountTypeId: req.body.accountTypeId,
    isArchived: req.body.isArchived
  }

  Account.findOneAndUpdate(conditions, update, function(err, result) {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.status(200).send({
      success: true
    });
  });
}