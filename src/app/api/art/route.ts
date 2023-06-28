import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary";
// import * as Cloudinary from "cloudinary";

// import { Buffer } from "node:buffer";
// import streamifier from "streamifier";
// import formidable from "formidable";

// import streamifier from "streamifier";
// import multer from "multer";

const stripe = new Stripe(process.env.STRIPE_KEY as string, {
  apiVersion: "2022-11-15",
});

// cloudinary.config({
//   cloud_name: "niikkoo",
//   api_key: "457368962555864",
//   api_secret: "F4heIn74E1CwxpTLndKx-B17lZk",
// });

export async function POST(req: NextRequest, res: NextResponse) {
  console.log("🔥POST");

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

  const isForSell = active === "true";

  // return NextResponse.json({ message: "TESTS" });

  const cloudiMeta = `name=${name}|collection=${collection}`;
  const stripeMeta = {
    name,
    collection,
    print_number,
    metadataX,
    metadataY,
  };
  // const tags = `${name}, ${collection}`;

  /// SAVE IMAGE TO CLOUDINARY
  let cloudinaryImageUrl: string;
  const cloudinaryForm = new FormData();

  cloudinaryForm.append("file", img);
  cloudinaryForm.append("api_key", process.env.CLOUDINARY_API_KEY!);
  cloudinaryForm.append("api_secret", process.env.CLOUDINARY_API_SECRET!);
  cloudinaryForm.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET!);
  cloudinaryForm.append("timestamp", Date.now().toString());
  cloudinaryForm.append("folder", "andrea-drawing-portfolio/drawing-pics");
  cloudinaryForm.append("context", cloudiMeta);
  // cloudinaryForm.append("tags", tags);
  // cloudinaryForm.append("background_removal", "cloudinary_ai");

  // console.log(img["name"]);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: cloudinaryForm,
      }
    );
    const cloudinaryRes = await response.json();

    cloudinaryImageUrl = cloudinaryRes.secure_url;
  } catch (err) {
    return NextResponse.json({ message: "CLOUDINARY error", data: err });
  }

  // return NextResponse.json({ message: "CLOUDINARY", data: cloudinaryImageUrl });

  ////////// *** STRIPE 💸 ***

  if (isForSell) {
    try {
      const product = await stripe.products.create({
        name,
        active: isForSell,
        images: [cloudinaryImageUrl],
        description,
        metadata: stripeMeta,
        default_price_data: {
          unit_amount: +price * 100,
          currency: "EUR",
        },
      });
      console.log(product);

      return NextResponse.json(product, { status: 201 });
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

  return NextResponse.json({ message: "DONE FOR NOW" });

  ///////////// TO MONGO
}
