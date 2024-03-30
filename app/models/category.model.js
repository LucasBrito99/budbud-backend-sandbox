const mongoose = require("mongoose");

const Category = mongoose.model(
  "Category",
  new mongoose.Schema({
    userId: String,
    name: String,
    icon: String
  })
);

module.exports = Category;
