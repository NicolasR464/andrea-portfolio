import { NextRequest, NextResponse } from "next/server";
import connectMongoose from "../../../utils/mongoose";
import Order from "../../../models/order";

export async function GET(req: NextRequest) {
  await connectMongoose();

  try {
    const dataRes = await Order.find();
    return NextResponse.json({ data: dataRes }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { msg: "couldn't get Mongo data" },
      { status: 500 }
    );
  }
}
