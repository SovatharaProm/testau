// /app/api/createcustomer/route.js
import dbConnect from "@/lib/db";
import Customer from "@/models/Customer";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  try {
    const { name, dateOfBirth, memberNumber, interest } = await req.json();
    const newCustomer = new Customer({ name, dateOfBirth, memberNumber, interest });
    await newCustomer.save();
    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: `Failed to create customer: ${error.message}` }, { status: 500 });
  }
}