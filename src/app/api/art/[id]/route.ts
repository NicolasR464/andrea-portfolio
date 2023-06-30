import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import connectMongoose from "../../../../utils/mongoose";
import Drawing from "../../../../models/drawing";
import { revalidateTag } from "next/cache";

const e = process.env;

const stripe = new Stripe(e.STRIPE_KEY as string, {
  apiVersion: "2022-11-15",
});

export async function PUT(req: NextRequest) {
  // FIRST DO A FETCH TO MONGO TO COMPARE THE VALUES
  console.log("HEY");

  connectMongoose();

  const id = 0;

  const oldData = await Drawing.findOne({ id });

  const formData = await req.formData();
  const img = formData.get("image") as File;
  const name = formData.get("name") as string;
  const collection = formData.get("collection") as string;
  const description = formData.get("description") as string;
  const active = formData.get("active") as string;
  const price = formData.get("price") as string;
  const print_number = formData.get("print_number") as string;
  const metadataX = formData.get("metadataX") as string;
  const metadataY = formData.get("metadataY") as string;

  return NextResponse.json({ name: "RESSS" });

  // FIRST DO A FETCH TO MONGO TO COMPARE THE VALUES
}
