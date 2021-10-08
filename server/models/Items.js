const { Schema, model } = require("mongoose");
//const Image = require("./Image");// After MVP
const Rating = require("./Rating");
//const Vendor = require("./Vendor");// Sprint 2

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  shortDescription: { type: String, required: true },

  longDescription: { type: String },

  category: {
    type: String,
  },

  location: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
    default: true,
  },

  vendor: {
    type: String,
  },
  price: {
    type: Number,
  },
  //modify after successful MVP
  image: { type: String },

  rating: [Rating],
});

const Items = model("Items", itemSchema);

module.exports = Items;
