import mongoose from "mongoose";

const { Schema, model, models, Model } = mongoose;

interface imageObj {
  public_id: string;
  url: string;
}

interface stripeObj {
  productId: string;
  priceId: string;
}

interface DrawingAttributes {
  name: string;
  drawing_collection: object;
  description: string;
  image: imageObj;
  isForSale: boolean;
  price: number;
  print_number_set: number;
  print_number_sold: number;
  width: number;
  height: number;
  stripe: stripeObj;
}

// interface DrawingDocument extends DrawingAttributes, Document {}

// interface DrawingModel extends Model<DrawingDocument>{}

const drawingSchema = new Schema<DrawingAttributes>({
  name: String,
  drawing_collection: { type: String, required: true },
  description: String,
  image: {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },
  isForSale: Boolean,
  price: Number,
  print_number_set: Number,
  print_number_sold: Number,
  width: Number,
  height: Number,
  stripe: { productId: { type: String }, priceId: { type: String } },
});

const Drawing: any =
  models.Drawing<DrawingAttributes> ||
  model<DrawingAttributes>("Drawing", drawingSchema);

export default Drawing;
