const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
