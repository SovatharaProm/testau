import dbConnect from "@/lib/db";
import Customer from "@/models/Customer";

export async function POST(req) {
  await dbConnect();  // Ensure the database is connected

  try {
    const body = await req.json(); // Parse the request body
    const { name, dateOfBirth, memberNumber, interest } = body;

    // Check for required fields
    if (!name || !dateOfBirth || !memberNumber) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
      });
    }

    // Create a new customer in the database
    const newCustomer = new Customer({
      name,
      dateOfBirth,
      memberNumber,
      interest,
    });

    await newCustomer.save();

    return new Response(JSON.stringify(newCustomer), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error adding customer:', error); // Log the error
    return new Response(
      JSON.stringify({ error: 'Failed to add customer' }),
      { status: 500 }
    );
  }
}
