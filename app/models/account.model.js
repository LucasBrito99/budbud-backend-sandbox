const mongoose = require("mongoose");

const Account = mongoose.model(
  "Account",
  new mongoose.Schema({
    userId: String,
    name: String,
    accountTypeId: String,
    currencyId: String,
    currentBalance: Number,
    isArchived: Boolean,
  })
);

module.exports = Account;
