const { Schema, model } = require("mongoose");
const Items = require("./Items");


const orderSchema = new Schema({
  startDate: {
    type: Date,
    default: Date.now(),
  },
  endDate: { type: Date, default: Date.now() + 7 },
  items: [Items],
});

const Order = model("Order", orderSchema);

module.exports = Order;
