const mongoose = require("mongoose");

const { Schema } = mongoose;

const marketSchema = new Schema({
  elementMarket: {
    type: String,
    required: true,
    trim: true,
  },
});

const Market = mongoose.model("Market", marketSchema);

module.exports = Market;
