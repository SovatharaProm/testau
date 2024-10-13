import Customer from "@/models/Customer";
import { connectToDB } from "@/utils/database";

// Set revalidation time to 1 second
export const revalidate = 1;

export const GET = async (request) => {
    try {
        await connectToDB();

        // Fetch all customers from the database
        const customers = await Customer.find({});

        return new Response(JSON.stringify(customers), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all customers", { status: 500 });
    }
}
