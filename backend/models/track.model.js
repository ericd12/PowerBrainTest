const mongoose = require("mongoose");
const elementSchema = require("../schemas/element.js");

const trackSchema = new mongoose.Schema({
  trackNumber: String,
  trackName: String,
  trackinfo: [elementSchema],
});

const Track = mongoose.model("Track", trackSchema);

module.exports = Track;
