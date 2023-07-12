import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_KEY as string, {
  apiVersion: "2022-11-15",
});

export async function POST(req: NextRequest) {
  console.log("🔥POST");

  const body = await req.json();

  console.log(body);

  const { name, active, description, metadata, price_amount } = body;

  try {
    const product = await stripe.products.create({
      name,
      active,
      description,
      metadata,
      default_price_data: {
        unit_amount: price_amount,
        currency: "EUR",
      },
    });

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
