import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import connectMongoose from "../../../utils/mongoose";
import Drawing from "../../../models/drawing";
import { revalidateTag } from "next/cache";
import { uploadImage } from "../../../utils/handle-img";
const e = process.env;

//////////

// import crypto from "crypto";
// const e = process.env;

// const generateSHA1 = (data: any) => {
//   const hash = crypto.createHash("sha1");
//   hash.update(data);
//   return hash.digest("hex");
// };

// const generateSignature = (publicId: string, apiSecret: string) => {
//   const timestamp = new Date().getTime();
//   return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
// };

// export const deleteImage = async (publicId: string) => {
//   const cloudName = e.CLOUDINARY_CLOUD_NAME!;
//   const timestamp: any = new Date().getTime();
//   const apiKey = e.CLOUDINARY_API_KEY!;
//   const apiSecret = e.CLOUDINARY_API_SECRET!;
//   const signature = generateSHA1(generateSignature(publicId, apiSecret));
//   const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

//   const cloudinaryForm = new FormData();

//   cloudinaryForm.append("public_id", publicId);
//   cloudinaryForm.append("signature", signature);
//   cloudinaryForm.append("api_key", apiKey);
//   cloudinaryForm.append("timestamp", timestamp);

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       body: cloudinaryForm,
//     });

//     const cloudinaryRes = await response.json();

//     return cloudinaryRes;
//   } catch (error) {
//     console.log("❌ cloudinary");

//     return error;
//   }
// };

// export const uploadImage = async (
//   img: File,
//   name: string,
//   collection: string
// ) => {
//   const cloudinaryForm = new FormData();

//   const cloudiMeta = `name=${name}|collection=${collection}`;

//   console.log(img);

//   console.log("START CLOUDINARY ATTEMPT");

//   cloudinaryForm.append("file", img);
//   cloudinaryForm.append("api_key", e.CLOUDINARY_API_KEY!);
//   cloudinaryForm.append("api_secret", e.CLOUDINARY_API_SECRET!);
//   cloudinaryForm.append("upload_preset", e.CLOUDINARY_UPLOAD_PRESET!);
//   cloudinaryForm.append("timestamp", Date.now().toString());
//   cloudinaryForm.append("folder", e.CLOUDINARY_UPLOAD_IMG_DRAWING_FOLDER!);
//   cloudinaryForm.append("context", cloudiMeta);

//   try {
//     const cloudiResponse = await fetch(
//       `https://api.cloudinary.com/v1_1/${e.CLOUDINARY_CLOUD_NAME}/image/upload`,
//       {
//         method: "POST",
//         body: cloudinaryForm,
//       }
//     );
//     console.log(cloudiResponse);

//     if (cloudiResponse.ok) {
//       const cloudiRes = await cloudiResponse.json();
//       console.log(cloudiRes);

//       return cloudiRes;
//     }
//   } catch (err) {
//     console.log(err);
//     return err;
//   }
// };

////////////

const stripe = new Stripe(e.STRIPE_KEY as string, {
  apiVersion: "2022-11-15",
});

export async function POST(req: NextRequest, res: NextResponse) {
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

  const stripeMeta = {
    name: name.toLowerCase(),
    collection: collection.toLowerCase(),
    print_number_set: print_number,
    print_number_sold: 0,
    metadataX,
    metadataY,
  };

  const uploadResp = await uploadImage(img, name, collection);

  console.log(uploadResp);

  ////////// *** STRIPE 💸 ***

  let productId: string | undefined = undefined;
  let priceId: any = undefined;
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
  console.log("TO MONGO ⭐️");
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
