import dbConnect from "@/lib/db";
import Customer from "@/models/Customer";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        await dbConnect();
        
        // Parse request body
        const { name, dateOfBirth, memberNumber, interest } = await req.json();
        
        // Create a new customer
        const newCustomer = new Customer({ name, dateOfBirth, memberNumber, interest });
        await newCustomer.save();

        return NextResponse.json(newCustomer, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: `Failed to create customer: ${error.message}` }, { status: 500 });
    }
};