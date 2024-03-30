const mongoose = require("mongoose");

const Transaction = mongoose.model(
  "Transaction",
  new mongoose.Schema({
    userId: String,
    description: String,
    amount: Number,
    categoryId: String,
    accountId: String,
    transactionTime: String,
  })
);

module.exports = Transaction;
