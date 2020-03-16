const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const trackSchema = new Schema({
        trackname: {
          type: [],
          required: true,

        },
      }, {
        timestamps: true,
      });

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;