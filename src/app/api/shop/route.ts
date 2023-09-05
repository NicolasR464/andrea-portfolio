import { NextRequest, NextResponse } from "next/server";
import connectMongoose from "../../../utils/mongoose";
import Drawing from "../../../models/drawing";
import { revalidateTag } from "next/cache";
import Stripe from "stripe";
import allowed_countriesArr from "../../../utils/stripe_shipping_allowed_countries";

const e = process.env;

const stripe = new Stripe(process.env.STRIPE_KEY as string, {
  apiVersion: "2022-11-15",
});

export async function GET(req: NextRequest, res: NextResponse) {
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
  const body: any = await req.json();

  // return NextResponse.json({ msg: "STRIPE BUY TEST" });

  const session = await stripe.checkout.sessions.create({
    success_url: e.DOMAIN! + "/success",
    cancel_url: e.DOMAIN! + "/buy?cancel=true",
    line_items: body,
    mode: "payment",
    invoice_creation: {
      enabled: true,
    },
    shipping_address_collection: { allowed_countries: allowed_countriesArr },
  });

  return NextResponse.json({ url: session.url, id: session.id });
}
