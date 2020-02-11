const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const elementSchema = new Schema({
    elementnumber: {type: String}

}, {
    timestamps: true,
});

const Element = mongoose.model('Element', elementSchema);

module.exports = Element;