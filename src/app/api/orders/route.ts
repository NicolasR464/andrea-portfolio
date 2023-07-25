import { NextRequest, NextResponse } from "next/server";
import connectMongoose from "../../../utils/mongoose";
import Order from "../../../models/order";
import moment from "moment";

export async function GET(req: NextRequest) {
  await connectMongoose();

  const { searchParams } = new URL(req.url);
  console.log(searchParams);

  const input = searchParams?.get("input");
  const inputDate = searchParams?.get("date");
  const test = searchParams?.get("test");

  console.log({ input });
  console.log({ inputDate });
  console.log({ test });

  if (input) {
    try {
      const dataRes = await Order.find({
        $or: [
          { "customerDetails.email": input },
          { "customerDetails.name": input },
        ],
      });
      console.log({ dataRes });

      return NextResponse.json({ data: dataRes }, { status: 200 });
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { msg: "couldn't get Mongo data" },
        { status: 500 }
      );
    }
  }

  if (inputDate && !inputDate.includes("-")) {
    const startDate = moment(inputDate, "ddd DD MMM YYYY")
      .startOf("day")
      .toDate();
    const endDate = moment(inputDate, "ddd DD MMM YYYY").endOf("day").toDate();

    try {
      const dataRes = await Order.find({
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      });
      console.log({ dataRes });

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
