const { Schema, model } = require("mongoose");

const costumeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  //can really expand this depending on how precise we want the search queries.

  //I envision this as a very basic sentence or two. Can be expanded if needed.
  description: { type: String },
  //Halloween, Superhero, etc.. if we want to nest this, we can make this a bit expansive, which may allow for more precise searching.
  type: { type: String },

  color: {
    type: String,
  },
  size: {
    type: String,
  },

  location: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
  vendor: {
    type: String,
  },
  price: {
    type: Number,
  },
});

const Rental = model("Costumes", costumeSchema);

module.exports = Rental;
