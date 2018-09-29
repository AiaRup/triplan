const mongoose = require('mongoose');
const { Schema } = mongoose;
const Day = require('./dayModel');

let planSchema = new Schema({
  name: String,
  days: [Day],
  city: String,
  tempPlaces: { type:[Schema.Types.Mixed], default: [] },
  tempEvents: { type:[Schema.Types.Mixed], default: [] },
  notes: { type:Schema.Types.Mixed, default: {}}
}, { minimize: false }, { usePushEach: true });

let Plan = mongoose.model('plan', planSchema);

// module.exports = Plan;


module.exports.planSchema = planSchema;
module.exports.plan = Plan;

