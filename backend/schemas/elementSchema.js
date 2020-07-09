const mongoose = require("mongoose");
// const autopopulate = require("mongoose-autopopulate");
const { Schema } = mongoose;

const elementSchema = new Schema(
  {
    elementNumber: { type: String, required: true },
    elementLabel: { type: String, required: true },
    elementDescription: { type: String, required: true },
    elementFormat: {       
      type: mongoose.Schema.Types.ObjectId,
      ref: "Format"
    },
    elementDuration: { type: String, required: true }, // Probably change type to Num
    elementCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    elementSubCategory: { type: String, required: true },
    elementMarket: { type: String, required: true },
    elementCogRating: { type: Number, required: true },
    elementPhysRating: { type: Number, required: true },
    elementLink: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// elementSchema.plugin(autopopulate);

module.exports = elementSchema;
