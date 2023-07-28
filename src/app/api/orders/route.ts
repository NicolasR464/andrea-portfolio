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

  console.log({ input });
  console.log({ inputDate });

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
    console.log("🔥🔥");

    console.log(filter);

    const documents = await Order.find(filter);

    return documents;
  }

  try {
    const dataRes = await findDocuments(input, inputDate);
    console.log("RES 🍕↴");

    console.log(dataRes);

    return NextResponse.json({ data: dataRes }, { status: 200 });
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { msg: "couldn't get Mongo data" },
      { status: 500 }
    );
  }

  // // if (input) {
  // //   try {
  // //     const dataRes = await Order.find({
  // //       $or: [
  // //         { "customerDetails.email": input },
  // //         { "customerDetails.name": input },
  // //       ],
  // //     });
  // //     console.log({ dataRes });

  // //     return NextResponse.json({ data: dataRes }, { status: 200 });
  // //   } catch (err) {
  // //     console.log(err);
  // //     return NextResponse.json(
  // //       { msg: "couldn't get Mongo data" },
  // //       { status: 500 }
  // //     );
  // //   }
  // // }

  // // if (inputDate && !inputDate.includes("-")) {
  // //   const startDate = moment(inputDate, "ddd DD MMM YYYY")
  // //     .startOf("day")
  // //     .toDate();
  // //   const endDate = moment(inputDate, "ddd DD MMM YYYY").endOf("day").toDate();

  //   try {
  //     const dataRes = await Order.find({
  //       createdAt: {
  //         $gte: startDate,
  //         $lte: endDate,
  //       },
  //     });
  //     console.log({ dataRes });

  //     return NextResponse.json({ data: dataRes }, { status: 200 });
  //   } catch (err) {
  //     console.log(err);
  //     return NextResponse.json(
  //       { msg: "couldn't get Mongo data" },
  //       { status: 500 }
  //     );
  //   }
  // }

  // IF NO FILTER
  // try {
  //   const dataRes = await Order.find();
  //   return NextResponse.json({ data: dataRes }, { status: 200 });
  // } catch (err) {
  //   console.log(err);
  //   return NextResponse.json(
  //     { msg: "couldn't get Mongo data" },
  //     { status: 500 }
  //   );
  // }
}
