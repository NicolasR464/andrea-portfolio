import { NextRequest, NextResponse } from "next/server";
import connectMongoose from "../../../utils/mongoose";
import Order from "../../../models/order";
import Drawing from "../../../models/drawing";
import { revalidateTag } from "next/cache";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_KEY as string, {
  apiVersion: "2022-11-15",
});

export async function POST(req: NextRequest) {
  connectMongoose();
  console.log("STRIPE EVENT 🚀");
  const reqParsed = await req.text();

  const signingSecret = process.env.STRIPE_WHSEC!;

  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(reqParsed, signature, signingSecret);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    // On error, log and return the error message.
    if (err! instanceof Error) console.log(err);
    console.log(`❌ Error message: ${errorMessage}`);

    return NextResponse.json(
      {
        error: {
          message: `Webhook Error: ${errorMessage}`,
        },
      },
      { status: 400 }
    );
  }

  // Successfully constructed event.
  console.log("✅ STRIPE WEBHOOK Success:", event.id);

  interface MySession extends Stripe.Checkout.Session {
    customer_details: any;
  }

  const session = event.data.object as MySession;

  const checkoutSession = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ["line_items"],
  });

  console.log("checkoutSession ↴");

  // FOR PRODUCTS INFO
  let ordersArr: Array<{}> | undefined;

  if (checkoutSession.line_items && checkoutSession.line_items.data) {
    console.log(checkoutSession.line_items.data);

    ordersArr = checkoutSession.line_items.data.map((order) => {
      return {
        id: order.id,
        amount_total: order.amount_total / 100,
        price: {
          id: order.price?.id,
          product: order.price?.product,
        },
        quantity: order.quantity,
      };
    });

    for (let lineItem of checkoutSession.line_items.data) {
      console.log(`Purchased product: ${lineItem.description}`);
    }
  }

  //   console.log("customer_details ↴");

  //   console.log(session.customer_details);
  //   // FOR CUSTOMER INFO

  //   console.log(session?.customer_details?.address);
  //   console.log(session?.customer_details?.email);
  //   console.log(session?.customer_details?.name);
  //   console.log(session?.customer_details?.phone);

  //   console.log("payment_status ↴");
  //   console.log(session.payment_status);

  //   console.log("amount total ↴");
  //   console.log(session.amount_total);

  //   console.log("shipping_details ↴");
  //   console.log(session.shipping_details);

  //   console.log("invoice_creation ↴");
  //   console.log(session.invoice_creation);

  //   console.log("custom_text ↴");
  //   console.log(session.custom_text);

  const orderObj = {
    customerDetails: {
      address: session?.customer_details?.address,
      email: session?.customer_details?.email,
      name: session?.customer_details?.name,
      phone: session?.customer_details?.phone,
    },
    orderItems: ordersArr,
  };

  // CREATE ORDER | MONGO
  try {
    const orderMongoRes = await Order.create(orderObj);
    console.log(orderMongoRes);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "MONGO ERROR ON ORDER MODEL CREATION", data: err },
      { status: 500 }
    );
  }

  // UPDATE DRAWING MODEL| MONGO

  const updateDrawingModel = async (order: any) => {
    const drawingUpdateRes = await Drawing.findOneAndUpdate(
      {
        // @ts-ignore
        "stripe.productId": order.price.product,
      },
      {
        $inc: {
          // @ts-ignore
          print_number_set: -order.quantity,
          // @ts-ignore
          print_number_sold: order.quantity,
        },
      },
      { new: true }
    );

    return drawingUpdateRes;
  };

  try {
    ordersArr?.forEach((order) => {
      console.log("💥💥💥");
      const updateFnRes = updateDrawingModel(order);
      console.log(updateFnRes);
    });

    revalidateTag("drawings");
  } catch (err) {
    console.log("❌ mongo err");
    console.log(err);
    return NextResponse.json(
      { message: "MONGO ERROR ON DRAWING MODEL UPDATE", data: err },
      { status: 500 }
    );
  }
}
