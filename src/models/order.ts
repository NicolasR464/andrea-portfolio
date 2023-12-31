import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const orderSchema = new Schema(
  {
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
        name: { type: String },
        amount_total: { type: Number },
        price: {
          id: {
            type: String,
          },
          product: { type: String },
        },
        quantity: { type: Number },
        imageUrl: { type: String },
      },
    ],
    amountTotal: { type: Number },
    customerId: { type: String },
    createdAt: { type: Date, default: Date.now },
    paymentStatus: { type: String },
    invoice: {
      id: { type: String },
      url: { type: String },
    },
    shippingStatus: { type: String },
  },
  { timestamps: true }
);

const Order: any = models.Order || model("Order", orderSchema);

export default Order;
