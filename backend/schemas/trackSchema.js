const mongoose = require("mongoose");
const elementSchema = require("./elementSchema");

const { Schema } = mongoose;

const trackSchema = new Schema({
  trackNumber: String,
  trackName: String,
  // trackInfo: [elementSchema],
  trackInfo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Element"
    }
  ]
});

module.exports = trackSchema;
