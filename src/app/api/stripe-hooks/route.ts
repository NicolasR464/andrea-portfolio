import { NextRequest, NextResponse } from "next/server";
import connectMongoose from "../../../utils/mongoose";
import Order from "../../../models/order";
import Drawing from "../../../models/drawing";
import { revalidateTag, revalidatePath } from "next/cache";
import Stripe from "stripe";
import mail from "@sendgrid/mail";
import { getInvoiceUrl, getProductInfo } from "../../../utils/getInvoice";

// ALT - https://codeshare.io/EBOdlp

mail.setApiKey(process.env.SENDGRID_KEY!);

const stripe = new Stripe(process.env.STRIPE_KEY as string, {
  apiVersion: "2022-11-15",
});

// ADD CONDITIONS ON STATUS TO DO THE CRUD
// + MAIL ON ORDER
// + UPDATE ORDERS TABLE ON PAYMENT STATUS CHANGED
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
  console.log("✅ STRIPE WEBHOOK Successss:", event.id);

  interface MySession extends Stripe.Checkout.Session {
    customer_details: any;
  }

  const session = event.data.object as MySession;

  const checkoutSession = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ["line_items"],
  });

  console.log("checkoutSession ↴");
  console.log(checkoutSession.line_items);

  // FOR PRODUCTS INFO
  let ordersArr: Array<{}> | undefined;
  let items_bought = 0;

  // const retrieveImg = async (prodId: any) => {
  //   const product = await stripe.products.retrieve(prodId);

  //   return product.images[0];
  // };

  if (checkoutSession.line_items && checkoutSession.line_items.data) {
    console.log(checkoutSession.line_items.data);

    for (let lineItem of checkoutSession.line_items.data) {
      items_bought += lineItem?.quantity!;
    }
  }

  async function getOrders() {
    try {
      const ordersPromises: any = checkoutSession?.line_items?.data.map(
        async (order) => {
          console.log({ order });

          const productInfo = await getProductInfo(order?.price?.product);
          console.log("❤️");

          console.log(productInfo);

          return {
            id: order.id,
            name: productInfo?.name,
            amount_total: order.amount_total / 100,
            price: {
              id: order.price?.id,
              product: order.price?.product,
            },
            quantity: order.quantity,
            imageUrl: productInfo?.images[0],
          };
        }
      );
      ordersArr = await Promise.all(ordersPromises);

      return ordersArr;
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { message: "STRIPE CHECKOUT LINE ITEMS ERR", data: err },
        { status: 500 }
      );
    }
  }

  const orders = await getOrders();
  console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥");

  console.log(orders);

  // return;
  // CREATE ORDER | MONGO
  console.log("SESSION ⭐️");

  console.log(session);
  console.log(session.amount_total);

  const createdAt = new Date(session.created * 1000);

  const invoiceUrl = await getInvoiceUrl(session.invoice);

  const orderObj = {
    customerDetails: {
      address: session?.customer_details?.address,
      email: session?.customer_details?.email,
      name: session?.customer_details?.name,
      phone: session?.customer_details?.phone,
    },
    orderItems: ordersArr,
    amountTotal: session.amount_total! / 100,
    customerId: session.customer,
    // createdAt: createdAt.toString(),
    invoice: { id: session.invoice, url: invoiceUrl },
  };

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
  revalidateTag("orders");
  revalidatePath("/a/orders");

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
      updateDrawingModel(order);
    });
  } catch (err) {
    console.log("❌ mongo err");
    console.log(err);
    return NextResponse.json(
      { message: "MONGO ERROR ON DRAWING MODEL UPDATE", data: err },
      { status: 500 }
    );
  }
  revalidateTag("drawings");
  // session?.customer_details?.email

  // SEND EMAIL TO ANDREA

  const msg = {
    to: process.env.HOST_EMAIL!,
    from: process.env.HOST_EMAIL!,

    templateId: "d-81ff00f6727149ea99c707166127dd16",
    dynamicTemplateData: {
      message_proprietaire:
        items_bought < 2
          ? "d'un de tes dessins"
          : "de quelques-uns de tes dessins",
      total_price: session.amount_total! / 100,
    },
  };
  console.log("email sending");

  mail.send(msg).then(
    () => {
      console.log("email sent! 🚀");
    },
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
        return NextResponse.json({ data: "Email couldn't go through...." });
      }
    }
  );
  return NextResponse.json({ finished: true }, { status: 201 });
}

// attachments: [
//     {
//       content: "pdfBase64Content",
//       filename: "your_file_name.pdf", // Replace with your actual file name
//       type: "application/pdf",
//       disposition: "attachment",
//     },
//   ],
