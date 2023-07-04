import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import connectMongoose from "../../../utils/mongoose";
import Drawing from "../../../models/drawing";
import { revalidateTag } from "next/cache";
import { uploadImage } from "../../../utils/handle-img";

const e = process.env;

// import { v2 as cloudinary } from "cloudinary";
// import * as Cloudinary from "cloudinary";

// import { Buffer } from "node:buffer";
// import streamifier from "streamifier";
// import formidable from "formidable";

// import streamifier from "streamifier";
// import multer from "multer";

const stripe = new Stripe(e.STRIPE_KEY as string, {
  apiVersion: "2022-11-15",
});

// cloudinary.config({
//   cloud_name: "niikkoo",
//   api_key: "457368962555864",
//   api_secret: "F4heIn74E1CwxpTLndKx-B17lZk",
// });

export async function POST(req: NextRequest, res: NextResponse) {
  console.log("🔥POST");
  connectMongoose();

  const formData = await req.formData();
  const img = formData.get("image") as File;
  const name = formData.get("name") as string;
  const collection = formData.get("collection") as string;
  const description = formData.get("description") as string;
  const active = formData.get("active") as string;
  const price = formData.get("price") as string;
  const print_number = formData.get("print_number") as string;
  const metadataX = formData.get("metadataX") as string;
  const metadataY = formData.get("metadataY") as string;

  const isForSale = active === "true";

  // return NextResponse.json({ message: "TESTS" });

  const cloudiMeta = `name=${name}|collection=${collection}`;

  const stripeMeta = {
    name: name.toLowerCase(),
    collection: collection.toLowerCase(),
    print_number_set: print_number,
    print_number_sold: 0,
    metadataX,
    metadataY,
  };
  // const tags = `${name}, ${collection}`;

  /// SAVE IMAGE TO CLOUDINARY

  // const cloudinaryForm = new FormData();

  // cloudinaryForm.append("file", img);
  // cloudinaryForm.append("api_key", e.CLOUDINARY_API_KEY!);
  // cloudinaryForm.append("api_secret", e.CLOUDINARY_API_SECRET!);
  // cloudinaryForm.append("upload_preset", e.CLOUDINARY_UPLOAD_PRESET!);
  // cloudinaryForm.append("timestamp", Date.now().toString());
  // cloudinaryForm.append("folder", e.CLOUDINARY_UPLOAD_IMG_DRAWING_FOLDER!);
  // cloudinaryForm.append("context", cloudiMeta);
  // cloudinaryForm.append("tags", tags);
  // cloudinaryForm.append("background_removal", "cloudinary_ai");

  // console.log(img["name"]);

  const uploadResp = await uploadImage(img, name, collection);

  ////////// *** STRIPE 💸 ***

  let productId: string = "";
  let priceId: any;
  if (isForSale) {
    try {
      const product = await stripe.products.create({
        name: name || `${collection}_${Date.now()}`,
        active: isForSale,
        images: [uploadResp.secure_url],
        metadata: stripeMeta,
        default_price_data: {
          unit_amount: +price * 100,
          currency: "EUR",
        },
      });
      console.log(product);

      productId = product.id;
      priceId = product.default_price;

      // return NextResponse.json(product, { status: 201 });
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "message" in error) {
        const message = (error as { message: string }).message;
        console.error(error);
        return NextResponse.json(message, { status: 500 });
      } else {
        console.error("Error creating product: ", error);
        return NextResponse.json("An error occured", { status: 500 });
      }
    }
  }

  // return NextResponse.json({ message: "DONE FOR NOW" });

  ///////////// TO MONGO
  console.log("⭐️");
  console.log(uploadResp.public_id);
  console.log(uploadResp.secure_url);

  console.log(print_number);

  const drawingObj = {
    name:
      name.toLowerCase() || `${collection.trim().toLowerCase()}_${Date.now()}`,
    drawing_collection: collection.trim().toLowerCase(),
    description: description || undefined,

    isForSale,
    image: { public_id: uploadResp.public_id, url: uploadResp.secure_url },
    price: price || undefined,
    print_number_set: print_number || undefined,
    print_number_sold: isForSale ? 0 : undefined,
    width: metadataX || undefined,
    height: metadataY || undefined,
    stripe: { productId, priceId },
  };

  try {
    const drawing = await Drawing.create(drawingObj);
    console.log(drawing);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "MONGO ERROR", data: err },
      { status: 500 }
    );
  }

  revalidateTag("drawings");
  return NextResponse.json(
    {
      message: "new drawing added ✔️",
    },
    { status: 201 }
  );
}

export async function GET(req: NextRequest, res: NextResponse) {
  console.log("GET API ART");

  connectMongoose();
  try {
    const drawings = await Drawing.find();
    return NextResponse.json({ data: drawings, status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
}
