const mongoose = require('mongoose');
let dateNow = new Date();
const pollSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  options: {
    type: Array,
    required: true
  },
  votes: {
    type: Array,
    required: false
  },
  dateCreated: {
    type: String,
    default: dateNow.toUTCString()
  }

})

module.exports = mongoose.model('polls', pollSchema);
