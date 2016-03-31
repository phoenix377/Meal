'use strict';

import mongoose from 'mongoose';

var MealSchema = new mongoose.Schema({
  name: String,
  info: String
});

export default mongoose.model('Meal', MealSchema);
