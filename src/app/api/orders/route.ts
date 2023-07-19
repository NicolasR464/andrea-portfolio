import { NextRequest, NextResponse } from "next/server";
import connectMongoose from "../../../utils/mongoose";
import Order from "../../../models/order";

export async function GET(req: NextRequest) {
  await connectMongoose();

  const { searchParams } = new URL(req.url);
  const input = searchParams?.get("input");

  if (input) {
    try {
      const dataRes = await Order.find({
        $or: [
          { "customerDetails.email": input },
          { "customerDetails.name": input },
        ],
      });
      console.log(dataRes);

      return NextResponse.json({ data: dataRes }, { status: 200 });
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { msg: "couldn't get Mongo data" },
        { status: 500 }
      );
    }
  }

  // IF NO FILTER
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
