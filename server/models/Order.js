const { Schema, model } = require("mongoose");
const { itemSchema } = require("./Items");

const orderSchema = new Schema({
  startDate: {
    type: Date,
    default: Date.now(),
  },
  endDate: Date,
  items: [itemSchema],
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

module.exports = { Order, orderSchema };
