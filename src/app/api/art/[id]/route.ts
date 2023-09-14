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

  const mongoData = await Drawing.findById(params.id);

  // PARSE REQ DATA
  const formData = await req.formData();
  const imgRaw = formData.get("image") as any;
  const name = formData.get("name") as string;
  const collection = formData.get("collection") as string;
  const description = formData.get("description") as string;
  const active = formData.get("active") as string;
  const price = formData.get("price") as string;
  const print_number = formData.get("print_number") as string;
  const metadataX = formData.get("metadataX") as string;
  const metadataY = formData.get("metadataY") as string;

  // let changeImg;
  interface imgObject {
    public_id?: string;
    url?: string;
  }
  let newImg = false;

  let img: imgObject | undefined;
  console.log(imgRaw);
  console.log(typeof imgRaw);

  if (imgRaw) {
    img = JSON.parse(imgRaw)!;
    newImg = true;
  }

  // if (Object.keys(img).length > 0) {
  //   console.log(img);

  //   console.log(newImg);
  //   console.log(img);
  // }

  let stripeId = mongoData.stripe.productId || undefined;
  let priceId = mongoData.stripe.priceId || undefined;

  const isForSale = active === "true";

  if (newImg) {
    try {
      const res = await deleteImage(mongoData.image.public_id);
    } catch (err) {
      return NextResponse.json({ message: err }, { status: 500 });
    }
  }

  // STRIPE UPDATE

  if (
    name != mongoData.name ||
    isForSale != mongoData.isForSale ||
    img ||
    +price != mongoData.price ||
    +print_number != mongoData.print_number_set ||
    +metadataX != mongoData.width ||
    +metadataY != mongoData.height
  ) {
    const stripeMeta = {
      collection,
      print_number_set: print_number,
      metadataX,
      metadataY,
    };

    if (mongoData?.stripe?.productId !== undefined) {
      if (+price != mongoData.price) {
        try {
          stripe.prices.update(mongoData.stripe.priceId, {
            active: false,
          });
        } catch (err) {
          console.log(err);
          return NextResponse.json(
            "An error occured with Stripe on 'putting old price off'",
            { status: 500 }
          );
        }

        try {
          const priceRes = await stripe.prices.create({
            unit_amount: +price * 100,
            currency: "eur",
            product: mongoData.stripe.productId,
          });
          priceId = priceRes.id;
        } catch (err) {
          console.log(err);
          return NextResponse.json(
            "An error occured with Stripe on 'creating new priceID'",
            { status: 500 }
          );
        }
      }

      // THEN - update the product
      try {
        stripe.products.update(mongoData.stripe.productId, {
          name,
          active: isForSale,
          images: newImg ? [img?.url] : [mongoData.image.url],
          metadata: stripeMeta,
          default_price: priceId,
        });
      } catch (err) {
        console.log(err);
        return NextResponse.json(
          "An error occured with Stripe on 'update product'",
          { status: 500 }
        );
      }
    } else if (isForSale) {
      try {
        const product = await stripe.products.create({
          name: name,
          active: isForSale,
          images: newImg ? [img?.url] : [mongoData.image.url],
          metadata: stripeMeta,
          default_price_data: {
            unit_amount: +price * 100,
            currency: "EUR",
          },
        });

        stripeId = product.id;
        priceId = product.default_price;
      } catch (error: unknown) {
        if (typeof error === "object" && error !== null && "message" in error) {
          const message = (error as { message: string }).message;
          console.error(error);
          return NextResponse.json(message, { status: 500 });
        } else {
          console.error("Error creating product: ", error);
          return NextResponse.json(
            "An error occured with Stripe on 'create new product'",
            { status: 500 }
          );
        }
      }
    }
  }
  // MONGO UPDATE
  const mongObj = {
    name,
    drawing_collection: collection,
    description: description == "undefined" ? undefined : description,
    image: newImg ? img : undefined,
    isForSale,
    price: +price || undefined,
    print_number_set: +print_number || undefined,
    width: +metadataX || undefined,
    height: +metadataY || undefined,
    stripe:
      stripeId === undefined ? undefined : { productId: stripeId, priceId },
  };

  try {
    const mongoRes = await Drawing.findByIdAndUpdate(mongoData._id, mongObj);
    revalidateTag("drawings");
    return NextResponse.json(mongoRes, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong with Mongo" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectMongoose();
  const mongoData = await Drawing.findById(params.id);

  try {
    await deleteImage(mongoData.image.public_id);
  } catch (err) {
    return NextResponse.json(
      { message: "couldn't delete the image from Cloudinary" },
      { status: 500 }
    );
  }

  // IF product id exists

  if (mongoData.stripe.productId) {
    try {
      stripe.products.update(mongoData.stripe.productId, {
        active: false,
      });
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { msg: "An error occured with Stripe on 'delete product'" },
        { status: 500 }
      );
    }
  }

  try {
    const mongoData = await Drawing.findByIdAndDelete(params.id);
    revalidateTag("drawings");
    return NextResponse.json({ mongoData }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err }, { status: 500 });
  }
}
