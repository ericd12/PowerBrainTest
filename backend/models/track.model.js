const mongoose = require("mongoose");

const trackSchema = new mongoose.Schema({
  trackNumber: String,
  trackName: String,
  // look at Yelp model later
  // author: {
  //   id: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User"
  //   },
  trackinfo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Element",
    },
  ],
});

const Track = mongoose.model("Track", trackSchema);

module.exports = Track;
