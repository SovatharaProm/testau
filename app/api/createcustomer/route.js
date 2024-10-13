import Customer from "@/models/Customer";
import { connectToDB } from "@/utils/database";

export const POST = async (req) => {
    try {
        await connectToDB();
        
        // Parse request body
        const { name, dateOfBirth, memberNumber, interest } = await req.json();
        
        // Create a new customer
        const newCustomer = new Customer({ name, dateOfBirth, memberNumber, interest });
        await newCustomer.save();

        return new Response(JSON.stringify(newCustomer), { status: 201 });
    } catch (error) {
        return new Response("Failed to create customer", { status: 500 });
    }
};
