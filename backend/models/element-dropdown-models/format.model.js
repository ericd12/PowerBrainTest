const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const formatSchema = new Schema({
    elementFormat: {
        type: String,
        required: true,
        trim: true, //removes white space before and after
    }
});

const Format = mongoose.model('Format', formatSchema);

module.exports = Format;