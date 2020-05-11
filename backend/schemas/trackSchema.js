const mongoose = require("mongoose");
const elementSchema = require("./elementSchema");

const { Schema } = mongoose;

const trackSchema = new Schema({
  trackNumber: String,
  trackName: String,
  trackinfo: [elementSchema],
});

module.exports = trackSchema;
