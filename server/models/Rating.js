const { Schema, model } = require("mongoose");

const ratingSchema = new Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    maxLength: 500,
  },
});

const Rating = model("Rating", ratingSchema);

module.exports = { Rating, ratingSchema };
