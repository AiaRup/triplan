const mongoose = require('mongoose');
const { Schema } = mongoose;
import Attraction from './atrractionModel';
import TheEvent from './eventModel';

let daySchema = new Schema({
  date: String,
  places: [Attraction],
  trip: [String],
  events: [TheEvent]
})

let Day = mongoose.model('day', daySchema);

module.exports = Day;