import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import connectMongoose from "../../../../utils/mongoose";
import Drawing from "../../../../models/drawing";
import { revalidateTag } from "next/cache";
import crypto from "crypto";
import axios from "axios";

const generateSHA1 = (data: any) => {
  const hash = crypto.createHash("sha1");
  hash.update(data);
  return hash.digest("hex");
};

const generateSignature = (publicId: string, apiSecret: string) => {
  const timestamp = new Date().getTime();
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

const e = process.env;

const stripe = new Stripe(e.STRIPE_KEY as string, {
  apiVersion: "2022-11-15",
});

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectMongoose();

  //   console.log(params.id);

  const oldData = await Drawing.findById(params.id);

  //   console.log(oldData);
  //   return NextResponse.json({ message: "testing" });

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

  const isOldImg = typeof img == "string";

  if (!isOldImg) {
    // let's CLOUDINARY

    console.log("OLD IMAGE TO DELETE");
    console.log(oldData.image.public_id);
    console.log("NEW IMAGE TO UPLOAD");

    // return;

    const handleDeleteImage = async (publicId: any) => {
      const cloudName = e.CLOUDINARY_CLOUD_NAME!;
      const timestamp = new Date().getTime();
      const apiKey = e.CLOUDINARY_API_KEY!;
      const apiSecret = e.CLOUDINARY_API_SECRET!;
      const signature = generateSHA1(generateSignature(publicId, apiSecret));
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

      try {
        const response = await axios.post(url, {
          public_id: publicId,
          signature: signature,
          api_key: apiKey,
          timestamp: timestamp,
        });

        console.error(response);
      } catch (error) {
        console.error(error);
      }
    };

    handleDeleteImage(oldData.image.public_id);
  }

  return NextResponse.json({ name: "RESSS" });

  // FIRST DO A FETCH TO MONGO TO COMPARE THE VALUES
}
