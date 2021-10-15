const mongoose = require('mongoose');
const { Schema } = mongoose;

const { itemSchema } = require("./Items");

// const orderSchema = new Schema({
//   startDate: {
//     type: Date,
//     default: Date.now(),
//   },
//   endDate: Date,
//   items: [itemSchema],
// });
const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  endDate: { type: Date },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Items'
    }
  ]
});



orderSchema.pre("save", async function (next) {
  if (this.isNew) {
    let dueByDate = new Date();
    dueByDate.setDate(dueByDate.getDate() + 7);
    this.endDate = dueByDate;
  }

  next();
});

const Order = mongoose.model('Order', orderSchema);



module.exports = Order;
