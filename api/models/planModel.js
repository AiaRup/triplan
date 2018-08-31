const mongoose = require('mongoose');
const { Schema } = mongoose;
const Day = require('./dayModel');

let planSchema = new Schema({
  name: String,
  days: [Day],
  city: String,
});

let Plan = mongoose.model('plan', planSchema);

module.exports = Plan;


// module.exports.planSchema = planSchema;
// module.exports.plan = Plan;

