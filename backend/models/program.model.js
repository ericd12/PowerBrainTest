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

const Program = mongoose.model("Program", programSchema);

module.exports = Program;
