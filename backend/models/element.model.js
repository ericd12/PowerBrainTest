const mongoose = require("mongoose");
const elementSchema = require('../schemas/element.js');

const Element = mongoose.model("Element", elementSchema);

module.exports = Element;
