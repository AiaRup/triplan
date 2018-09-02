const mongoose = require('mongoose');
const { Schema } = mongoose;
// const Attraction = require('./atrractionModel');
// const TheEvent = require('./eventModel');


let daySchema = new Schema({
  date: String,
  places: [Schema.Types.Mixed],
});
// let daySchema = new Schema({
//   date: String,
//   places: [Attraction],
//   trip: [String],
//   events: [TheEvent]
// });

module.exports = daySchema;