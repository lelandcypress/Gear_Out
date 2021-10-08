const { Schema, model } = require("mongoose");
const Items = require("./Items");


const orderSchema = new Schema({
  startDate: {
    type: Date,
    default: Date.now(),
  },
  endDate: Date,
  items: [Items],
});

// hash user password
orderSchema.pre("save", async function (next) {
  if (this.isNew) {
    let dueByDate = new Date();
    dueByDate.setDate(dueByDate.getDate() + 7);
    this.endDate = dueByDate;
  }

  next();
});

const Order = model("Order", orderSchema);

module.exports = Order;
