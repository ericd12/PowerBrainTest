const mongoose = require("mongoose");

const { Schema } = mongoose;

const programSchema = new Schema(
  {
    programNumber: String,
    programName: String,
    programInfo: {
      type: [],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = programSchema;
