import { NextRequest, NextResponse } from "next/server";
import connectMongoose from "../../../utils/mongoose";
import Drawing from "../../../models/drawing";
import { revalidateTag } from "next/cache";
import Stripe from "stripe";
import allowed_countries from "../../../utils/stripe_shipping_allowed_countries";

const e = process.env;

const stripe = new Stripe(process.env.STRIPE_KEY as string, {
  apiVersion: "2022-11-15",
});

export async function GET(req: NextRequest, res: NextResponse) {
  console.log("GET API SHOP");
  connectMongoose();
  try {
    const drawingsForSale = await Drawing.find({ isForSale: true });

    return NextResponse.json({ data: drawingsForSale, status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  //   const stripe = require('stripe')('sk_test_51NKdbrAInrsLeQjRgaAsBnlZZ9tE7PhUjMidorCx24Ow6TLTny64VAEbG51YwCMK2JEYXaBjXFzPlUZOdQwigyfp00OOx7YRoW');

  // const shippingRate = await stripe.shippingRates.create({
  //   display_name: 'Ground shipping',
  //   type: 'fixed_amount',
  //   fixed_amount: {amount: 500, currency: 'usd'},
  // });

  console.log("SHOP POST 🚀");

  const body = await req.json();

  console.log(body);

  console.log(body.drawingStripeId);

  // return NextResponse.json({ msg: "STRIPE BUY TEST" });

  const session = await stripe.checkout.sessions.create({
    success_url: e.DOMAIN! + "/buy?success=true",
    cancel_url: e.DOMAIN! + "/buy?cancel=true",
    line_items: [{ price: body.drawingStripeId, quantity: 1 }],
    mode: "payment",
    shipping_address_collection: { allowed_countries: allowed_countries },
  });

  return NextResponse.json({ url: session.url, id: session.id });
}
