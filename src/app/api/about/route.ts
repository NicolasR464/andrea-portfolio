import { NextRequest, NextResponse } from "next/server";
import connectMongoose from "../../../utils/mongoose";
import Bio from "../../../models/about";
import { revalidateTag } from "next/cache";
import { uploadImage } from "../../../utils/handle-img";
const e = process.env;

export async function GET() {
  await connectMongoose();
  try {
    const bio = await Bio.findOne();
    return NextResponse.json({ bio }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  console.log("POST 🚀");
  await connectMongoose();

  const formData = await req.formData();
  const img = formData.get("image") as any;
  const text = formData.get("text") as string;

  // console.log(text);
  // console.log(img);
  // console.log(typeof img);
  // let public_img_id;
  // let img_url;

  // if (img !== "undefined") {
  //   const uploadResp = await uploadImage(img, "pic", "bio");

  //   console.log(uploadResp.public_id);
  //   console.log(uploadResp.secure_url);
  //   public_img_id = uploadResp.public_id;
  //   img_url = uploadResp.secure_url;
  // }

  const mongoObj: any = {};
  mongoObj.text = text;

  if (img !== "undefined") {
    const imgParsed = JSON.parse(img);
    mongoObj.image = imgParsed;
  }

  try {
    const bio = await Bio.findOneAndUpdate(mongoObj);
    revalidateTag("bio");
    return NextResponse.json({ bio }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function PUT() {
  try {
    const bio = await Bio.findOneAndUpdate();

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err }, { status: 500 });
  }
}
