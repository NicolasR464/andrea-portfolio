import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const orderSchema = new Schema({
  customerDetails: {
    address: {
      city: { type: String },
      country: { type: String },
      line1: { type: String },
      line2: { type: String },
      postal_code: { type: String },
      state: { type: String },
    },
    email: { type: String },
    name: { type: String },
    phone: { type: String },
  },
  orderItems: [
    {
      id: { type: String },
      amount_total: { type: Number },
      price: {
        id: {
          type: String,
        },
        product: { type: String },
      },
      quantity: { type: Number },
    },
  ],
  amountTotal: { type: Number },
  customerId: { type: String },
  createdAt: { type: Date },
  paymentStatus: { type: String },
  invoice: {
    id: { type: String },
    url: { type: String },
  },
  shippingStatus: { type: String },
});

const Order = models.Order || model("Order", orderSchema);

export default Order;
