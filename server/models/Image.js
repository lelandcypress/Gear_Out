const { Schema, model } = require("mongoose");

const imageSchema = new Schema({
  name: String,
  alt: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

const Image = model("Image", imageSchema);

module.exports = Image;
