import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary";
import * as Cloudinary from "cloudinary";

import { Buffer } from "node:buffer";
import streamifier from "streamifier";
import formidable from "formidable";

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

// export const dynamic = "auto";
// export const dynamicParams = true;
// export const revalidate = false;
// export const fetchCache = "auto";
// export const runtime = "nodejs";
// export const preferredRegion = "auto";

export async function POST(req: NextRequest, res: NextResponse) {
  console.log("🔥POST");
  // const form = formidable({ multiples: true });

  // console.log(req.method);
  // console.log(req.body);
  // // console.log(req.file.buffer);
  // console.log(typeof req.body);
  const formData = await req.formData();
  const img = formData.get("image") as File;

  const width = "width";
  const height = "height";

  const metadata = `width:${width}|height:${height}`;

  const cloudinaryForm = new FormData();

  /// CREATE CLOUDINARY SIGNATURE
  let cloudiSign = "" as string;

  // const signuploadform = () => {
  //   const timestamp = Math.round(new Date().getTime() / 1000);

  //   try {
  //     const signature = Cloudinary.v2.utils.api_sign_request(
  //       {
  //         timestamp: timestamp,
  //       },
  //       process.env.CLOUDINARY_API_SECRET!
  //     );

  //     // cloudiSign = signature;
  //     // console.log(signature);

  //     return { timestamp, signature };
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const signatureRes = signuploadform();
  // console.log(signatureRes);

  ///

  cloudinaryForm.append("file", img);
  cloudinaryForm.append("api_key", process.env.CLOUDINARY_API_KEY!);
  cloudinaryForm.append("api_secret", process.env.CLOUDINARY_API_SECRET!);
  cloudinaryForm.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET!);
  cloudinaryForm.append("timestamp", Date.now().toString());
  cloudinaryForm.append("folder", "andrea-drawing-portfolio");
  cloudinaryForm.append("context", metadata);
  // cloudinaryForm.append("background_removal", "cloudinary_ai");

  // console.log(formcloudinaryForm.get("image"));

  console.log(img["name"]);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: cloudinaryForm,
      }
    );
    const cloudinaryRes = await response.json();
    console.log(cloudinaryRes);
    return NextResponse.json({ message: "CLOUDINARY", data: cloudinaryRes });
  } catch (err) {
    console.log("💥");
    console.log(err);
    return NextResponse.json({ message: "CLOUDINARY NOT OK", data: err });
  }

  /////////////////
  // cloudinary.uploader.upload(img["name"]).then((res) => {
  //   console.log(res);
  // });

  // const readStream = img.toReadStream();

  // const readStream = img.toReadStream();

  // return;

  // cloudinary.uploader.upload(img);

  // var imgBuf = Buffer.from(img);

  // streamifier.createReadStream(img);
  // console.log(typeof img);

  // const arrayBuffer = await img.arrayBuffer();
  // const buffer = Buffer.from(arrayBuffer);

  // console.log(buffer);

  // return NextResponse.json({ message: "test ok" });

  // async function uploader(file: File) {
  //   const arrayBuffer = await file.arrayBuffer();
  //   const buffer = Buffer.from(arrayBuffer);

  //   console.log(buffer);

  //   return NextResponse.json({ message: "test ok" });

  //   return new Promise((resolve, reject) => {
  //     cloudinary.uploader
  //       .upload_stream(
  //         {
  //           resource_type: "image",
  //           folder: "andrea-drawing-portfolio/drawing-pics",
  //         },
  //         onDone
  //       )
  //       .end(buffer);
  //     function onDone(error: any, result: any) {
  //       if (error) {
  //         return reject({ success: false, error });
  //       }
  //       return resolve({ success: true, result });
  //     }
  //   });
  // }

  // const imgRes = await uploader(img);
  // console.log(imgRes);

  ////////// *** STRIPE 💸 ***

  // try {
  //   const product = await stripe.products.create({
  //     name,
  //     active,
  //     description,
  //     metadata,
  //     default_price_data: {
  //       unit_amount: price_amount,
  //       currency: "EUR",
  //     },
  //   });

  //   return NextResponse.json(product, { status: 201 });
  // } catch (error: unknown) {
  //   if (typeof error === "object" && error !== null && "message" in error) {
  //     const message = (error as { message: string }).message;
  //     console.error(error);
  //     return NextResponse.json(message, { status: 500 });
  //   } else {
  //     console.error("Error creating product: ", error);
  //     return NextResponse.json("An error occured", { status: 500 });
  //   }
  // }
}
