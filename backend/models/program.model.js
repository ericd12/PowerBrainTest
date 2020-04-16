const mongoose = require("mongoose");

const { Schema } = mongoose;

const programSchema = new Schema(
  {
    programinfo: {
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
