const mongoose = require('mongoose');
const { Schema } = mongoose;

let eventSchema = new Schema({
  dateHour: String,
  address: String,
  name: String,
  details: [String]
});

module.exports = eventSchema;