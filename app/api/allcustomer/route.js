import dbConnect from "@/lib/db";
import Customer from "@/models/Customer";
import { NextResponse } from "next/server";

export const revalidate = 1;

export const GET = async (request) => {
    try {
        await dbConnect();

        // Fetch all customers from the database
        const customers = await Customer.find({});

        const response = NextResponse.json(customers, { status: 200 });

        // Add cache-control header to prevent caching
        response.headers.set('Cache-Control', 'no-store');

        return response;
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
    }
}