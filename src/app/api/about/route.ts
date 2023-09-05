import { NextRequest, NextResponse } from "next/server";
import connectMongoose from "../../../utils/mongoose";
import About from "../../../models/about";
import { revalidateTag } from "next/cache";
import { uploadImage } from "../../../utils/handle-img";
const e = process.env;

export async function GET() {
  await connectMongoose();
  try {
    const bio = await About.findOne();
    return NextResponse.json({ bio }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await connectMongoose();

  const formData = await req.formData();
  const img = formData.get("image") as any;
  const text = formData.get("text") as string;

  const mongoObj: any = {};
  mongoObj.text = text;

  if (img !== "undefined") {
    const imgParsed = JSON.parse(img);
    mongoObj.image = imgParsed;
  }

  try {
    const bio: any = await About.findOneAndUpdate(mongoObj);
    revalidateTag("bio");
    return NextResponse.json({ bio }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err }, { status: 500 });
  }
}

export async function PUT() {
  try {
    const bio = await About.findOneAndUpdate();

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err }, { status: 500 });
  }
}
