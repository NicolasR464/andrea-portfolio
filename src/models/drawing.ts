import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const drawingSchema = new Schema({
  name: { type: String, required: true },
  drawing_collection: { type: String, required: true },
  description: String,
  image: String,
  isForSell: Boolean,
  price: Number,
  print_number: Number,
  width: Number,
  height: Number,
  stripeId: String,
});

const Drawing = models.Drawing || model("Drawing", drawingSchema);

export default Drawing;
