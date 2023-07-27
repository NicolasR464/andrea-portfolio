import { NextRequest, NextResponse } from "next/server";
import connectMongoose from "../../../../utils/mongoose";
import Order from "../../../../models/order";

export async function GET(req: NextRequest) {
  await connectMongoose();

  // const url = new URL(req.url);
  // console.log(url);

  return NextResponse.json("hey");
}
