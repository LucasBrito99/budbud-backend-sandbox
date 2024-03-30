const db = require("../models");
const Transaction = db.transaction;
const Account = db.account;
const Category = db.category;
const User = db.user;
const Currency = require('../repositories/currencies.repository');

exports.create = (req, res) => {
  const transaction = new Transaction({
    userId: req.userId,
    description: req.body.description,
    amount: req.body.amount,
    categoryId: req.body.categoryId,
    accountId: req.body.accountId,
    transactionTime: req.body.transactionTime,
  });

  transaction.save((err, account) => {
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
  let conditions = {
    userId: req.userId
  };

  if (req.query.accountId) {
    conditions.accountId = req.query.accountId;
  }

  if (req.query.categoryId) {
    conditions.categoryId = req.query.categoryId;
  }
  

  Transaction.find(conditions).exec(async (err, transactions) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    try {
      const result = await Promise.all(transactions.map(async (transaction) => {
        
        const account = await Account.findById(transaction.accountId).exec();
        const category = await Category.findById(transaction.categoryId).exec();
        const user = await User.findById(req.userId).exec();

        return {
          id: transaction.id,
          balance: (account.currentBalance ?? 0).toFixed(2),
          category: {
            name: category.name,
            icon: category.icon
          },
          description: transaction.description,
          creatorUserName: user.username,
          account: {
            name: account.name,
            currency: Currency.items.find((currency) => currency.id == account.currencyId)
          },
          amount: (transaction.amount ?? 0).toFixed(2),
          transactionTime: transaction.transactionTime,
          amountInDefaultCurrency: (transaction.amount * 1).toFixed(2)
        };
      }));

      res.status(200).send({
        success: true,
        result: {transactions: result}
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
      return;
    }
  })
}

exports.delete = (req, res) => {
  Transaction.deleteOne({
    userId: req.userId,
    id: req.params.id
  }).exec((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.status(200).send({
      success: true
    });
  })
}

exports.show = (req, res) => {
  Transaction.findById(req.params.id).exec(async (err, transaction) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    let result = null;
    try {
      const account = await Account.findById(transaction.accountId).exec();
      const category = await Category.findById(transaction.categoryId).exec();
      const user = await User.findById(req.userId).exec();

      result = {
        id: transaction.id,
        balance: (account.currentBalance ?? 0).toFixed(2),
        category: {
          name: category.name,
          icon: category.icon
        },
        description: transaction.description,
        creatorUserName: user.username,
        account: {
          name: account.name,
          currency: Currency.items.find((currency) => currency.id == account.currencyId)
        },
        amount: (transaction.amount ?? 0).toFixed(2),
        transactionTime: transaction.transactionTime,
        amountInDefaultCurrency: (transaction.amount * 1).toFixed(2)
      };
    } catch (err) {
      res.status(500).send({ success: false, result: err.message });
      return;
    }

    console.log(result);
    
    
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
    description: req.body.description,
    amount: req.body.amount,
    categoryId: req.body.categoryId,
    accountId: req.body.accountId,
    transactionTime: req.body.transactionTime
  }

  Transaction.findOneAndUpdate(conditions, update, function(err) {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.status(200).send({
      success: true
    });
  });
}