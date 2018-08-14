const mongoose = require('mongoose');
const { Schema } = mongoose;

let attractionSchema = new Schema({
  name: String,
  catrgory: String,
  address: String,
  lat: Number,
  lng: Number,
  duration: String,
});

let Attraction = mongoose.model('attraction', attractionSchema);

module.exports = Attraction;