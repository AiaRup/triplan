const mongoose = require('mongoose');
const { Schema } = mongoose;
const Plan = require('./planModel').planSchema;
// const Attraction = require('./atrractionModel');
// const Event = require('./eventModel');

let userSchema = new Schema({
  name: String,
  oktaID: String,
  email: String,
  plans: { type:[Plan], default: [] }
}, { minimize: false }, { usePushEach: true });


// let userSchema = new Schema({
//   name: String,
//   oktaID: String,
//   email: String,
//   plans: { type:[Plan], default: [] },
//   tempPlaces: { type:[Attraction], default: [] },
//   tempEvents: { type:[Event], default: [] }
// }, { minimize: false }, { usePushEach: true });

let User = mongoose.model('user', userSchema);

module.exports = User;