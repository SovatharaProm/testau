// /app/api/allcustomer/route.js
import dbConnect from "@/lib/db";
import Customer from "@/models/Customer";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
    const customers = await Customer.find({});
    return NextResponse.json(customers);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 });
  }
}
