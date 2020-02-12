const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const elementSchema = new Schema({
    elementnumber: {type: String, required: true},
    elementlabel: {type: String, required: true},
    elementDescription: {type: String, required: true}
}, {
    timestamps: true,
});

const Element = mongoose.model('Element', elementSchema);

module.exports = Element;