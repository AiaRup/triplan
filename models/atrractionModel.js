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

module.exports = attractionSchema;