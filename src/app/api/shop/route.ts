import { NextRequest, NextResponse } from "next/server";
import connectMongoose from "../../../utils/mongoose";
import Drawing from "../../../models/drawing";
import { revalidateTag } from "next/cache";

export async function GET(req: NextRequest, res: NextResponse) {
  console.log("GET API SHOP");
  connectMongoose();
  try {
    const drawingsForSale = await Drawing.find({ isForSale: true });
    console.log(drawingsForSale);

    return NextResponse.json({ data: drawingsForSale, status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
}
