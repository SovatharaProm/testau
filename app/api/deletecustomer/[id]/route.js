import Customer from "@/models/Customer";
import dbConnect from "@/lib/db";

// DELETE: Delete a customer by ID
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const deletedCustomer = await Customer.findByIdAndDelete(params.id);

    if (!deletedCustomer) {
      return new Response(JSON.stringify({ message: "Customer not found" }), { status: 404 });
    }

    return new Response(
      JSON.stringify({ message: "Customer deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error deleting customer", error: error.message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
