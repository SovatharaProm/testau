// /app/api/allcustomer/route.js
import dbConnect from "@/lib/db";
import Customer from "@/models/Customer";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
    const customers = await Customer.find({});
    const response = NextResponse.json(customers);
    
    // Add cache-control header to prevent caching
    response.headers.set('Cache-Control', 'no-store');
    
    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
  }
}
