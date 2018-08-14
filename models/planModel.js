const mongoose = require('mongoose');
const { Schema } = mongoose;
import Day from './dayModel';

let planSchema = new Schema({
  name: String,
  days: [Day],
  city: String,
});

let Plan = mongoose.model('plan', planSchema);

module.exports = Plan;