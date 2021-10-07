/*

**BUILD OUT IN NEXT SPRINT**

const { Schema, model } = require("mongoose");
const Rating = require("./Rating");

const vendorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  vendorRating: { Rating },
});

const Vendor = model("Vendor", vendorSchema);*/
