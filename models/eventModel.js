const mongoose = require('mongoose');
const { Schema } = mongoose;

let eventSchema = new Schema({
  dateHour: String,
  address: String,
  name: String,
  details: [String]
});

let TheEvent = mongoose.model('event', eventSchema);

module.exports = TheEvent;