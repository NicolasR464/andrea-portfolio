import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import connectMongoose from "../../../../utils/mongoose";
import Drawing from "../../../../models/drawing";
import { revalidateTag } from "next/cache";

import { deleteImage, uploadImage } from "../../../../utils/handle-img";

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

  const mongoData = await Drawing.findById(params.id);

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

  console.log({ active });

  if (!isOldImg) {
    // let's CLOUDINARY

    console.log("OLD IMAGE TO DELETE");
    console.log(mongoData.image.public_id);
    console.log("NEW IMAGE TO UPLOAD");

    try {
      const res = await deleteImage(mongoData.image.public_id);
      console.log(res);
    } catch (err) {
      return NextResponse.json({ message: err }, { status: 500 });
    }

    try {
      const imageRes = await uploadImage(img, name, collection);
      console.log(imageRes);
    } catch (err) {
      console.log(err);
    }
  }

  // IF 'ACTIVE' WE STRIPE
  // https://stripe.com/docs/api/products/update
  if (active && mongoData.stripId) {
    const product = await stripe.products.update(mongoData.stripId, {
      metadata: { order_id: "6735" },
    });
  }

  return NextResponse.json({ name: "RESSS" });

  // FIRST DO A FETCH TO MONGO TO COMPARE THE VALUES
}
