// /app/api/customer/[id]/route.js
import dbConnect from "@/lib/db";
import Customer from "@/models/Customer";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  await dbConnect();
  try {
    const { name, dateOfBirth, memberNumber, interest } = await req.json();
    const updatedCustomer = await Customer.findByIdAndUpdate(
      params.id,
      { name, dateOfBirth, memberNumber, interest },
      { new: true }
    );
    if (!updatedCustomer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }
    return NextResponse.json(updatedCustomer);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update customer" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(params.id);
    if (!deletedCustomer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Customer deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete customer" }, { status: 500 });
  }
}
