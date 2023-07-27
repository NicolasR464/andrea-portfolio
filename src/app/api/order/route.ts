import { NextRequest, NextResponse } from "next/server";
import connectMongoose from "../../../utils/mongoose";
import Order from "../../../models/order";

export async function GET(req: NextRequest) {
  await connectMongoose();

  const { searchParams } = new URL(req.url);

  const orderId = searchParams.get("id");

  try {
    const orderInfo = await Order.findById(orderId);
    return NextResponse.json({ order: orderInfo }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err }, { status: 500 });
  }
}
