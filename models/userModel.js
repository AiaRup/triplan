const mongoose = require('mongoose');
const { Schema } = mongoose;
const Plan = require('./planModel').planSchema;
const Attraction = require('./atrractionModel');

let userSchema = new Schema({
  name: String,
  password: String,
  plans: [Plan],
  tempPlaces: [Attraction]
});

let User = mongoose.model('user', userSchema);

module.exports = User;