import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const drawingSchema = new Schema({
  name: String,
  drawing_collection: { type: String, required: true },
  description: String,
  image: { type: String, required: true },
  isForSale: Boolean,
  price: Number,
  print_number_set: Number,
  print_number_sold: Number,
  width: Number,
  height: Number,
  stripeId: String,
});

const Drawing = models.Drawing || model("Drawing", drawingSchema);

export default Drawing;
