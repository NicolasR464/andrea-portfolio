import { NextRequest, NextResponse } from "next/server";
import connectMongoose from "../../../utils/mongoose";
import Order from "../../../models/order";
import moment from "moment";

export async function GET(req: NextRequest) {
  await connectMongoose();

  const { searchParams } = new URL(req.url);

  const input = searchParams?.get("input");
  const inputDate = searchParams?.get("date");

  async function findDocuments(input: any, inputDate: any) {
    const filter: any = {};

    if (input) {
      filter.$or = [
        { "customerDetails.email": input },
        { "customerDetails.name": input },
      ];
    }

    if (inputDate && inputDate !== "undefined") {
      filter.createdAt = {};
      const startDate = moment(
        inputDate.includes("-") ? inputDate.split("-")[0] : inputDate,
        "ddd DD MMM YYYY"
      )
        .startOf("day")
        .toDate();
      const endDate = moment(
        inputDate.includes("-") ? inputDate.split("-")[1] : inputDate,
        "ddd DD MMM YYYY"
      )
        .endOf("day")
        .toDate();

      filter.createdAt.$gte = startDate;
      filter.createdAt.$lt = endDate;
    }

    const documents = await Order.find(filter);

    return documents;
  }

  try {
    const dataRes = await findDocuments(input, inputDate);

    return NextResponse.json({ data: dataRes }, { status: 200 });
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { msg: "couldn't get Mongo data" },
      { status: 500 }
    );
  }
}
