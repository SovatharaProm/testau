// API for getting all customers
import dbConnect from "@/lib/db";
import Customer from "@/models/Customer";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect(); // Ensure database connection

  try {
    // Fetch all customers
    const customers = await Customer.find({});
    return NextResponse.json(customers, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 });
  }
}
