const mongoose = require("mongoose");

const { Schema } = mongoose;

const categorySchema = new Schema({
  elementCategory: {
    type: String,
    required: true,
    trim: true, // removes white space before and after
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
