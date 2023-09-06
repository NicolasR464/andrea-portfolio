import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import connectMongoose from "../../../utils/mongoose";
import Drawing from "../../../models/drawing";
import { revalidateTag } from "next/cache";
import { uploadImage } from "../../../utils/handle-img";
const e = process.env;

//////////

////////////

const stripe = new Stripe(e.STRIPE_KEY as string, {
  apiVersion: "2022-11-15",
});

export async function POST(req: NextRequest, res: NextResponse) {
  connectMongoose();

  const formData = await req.formData();
  const imgRaw = formData.get("image") as string;
  const nameInput = formData.get("name") as string;
  const collection = formData.get("collection") as string;
  const description = formData.get("description") as string;
  const active = formData.get("active") as string;
  const price = formData.get("price") as string;
  const print_number = formData.get("print_number") as string;
  const metadataX = formData.get("metadataX") as string;
  const metadataY = formData.get("metadataY") as string;
  const img: any = JSON.parse(imgRaw);

  const isForSale = active === "true";

  let name = nameInput.trim().toLowerCase();

  console.log({ name });
  console.log(typeof name);

  if (nameInput == "") name = `${collection.trim()}_${Date.now()}_def`;

  const stripeMeta = {
    collection: collection.trim().toLowerCase(),
    print_number_set: print_number,
    print_number_sold: 0,
    metadataX,
    metadataY,
  };

  ////////// *** STRIPE  ***

  let productId: string | undefined = undefined;
  let priceId: any = undefined;
  if (isForSale) {
    try {
      const product = await stripe.products.create({
        name: name.trim().toLowerCase(),
        active: isForSale,
        images: [img.url],
        metadata: stripeMeta,
        default_price_data: {
          unit_amount: +price * 100,
          currency: "EUR",
        },
      });

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

  const drawingObj = {
    name: name.trim().toLowerCase(),
    drawing_collection: collection.trim().toLowerCase(),
    description: description || undefined,

    isForSale,
    image: img,
    price: price || undefined,
    print_number_set: print_number || undefined,
    print_number_sold: isForSale ? 0 : undefined,
    width: metadataX || undefined,
    height: metadataY || undefined,
    stripe: { productId, priceId },
  };

  try {
    const drawing = await Drawing.create(drawingObj);
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
  connectMongoose();

  const { searchParams } = new URL(req.url);

  const home = searchParams?.has("p");

  try {
    let drawings;
    if (home) {
      drawings = await Drawing.find().select("drawing_collection image.url");
    } else {
      drawings = await Drawing.find();
    }
    return NextResponse.json({ data: drawings, status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
}
