const mongoose = require('mongoose');
const { Schema } = mongoose;
import Plan from './planModel';
import Attraction from './atrractionModel';

let userSchema = new Schema({
  name: String,
  password: String,
  plans: [Plan],
  tempPlaces: [Attraction]
});

let User = mongoose.model('user', userSchema);

module.exports = User;