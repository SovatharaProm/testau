"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Fetch all customers
  useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await fetch(`/api/listcus`); // Adjust API route as necessary
        if (!response.ok) throw new Error("Failed to fetch customer details");

        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCustomers();
  }, []);

  if (loading) return <p>Loading customers...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-8">Customer List</h1>
        {customers.length > 0 ? (
          <div>
            {customers.map((customer) => (
              <div key={customer._id} className="mb-4 border-b pb-4">
                <p><strong>Name:</strong> {customer.name}</p>
                <p><strong>Date of Birth:</strong> {new Date(customer.dateOfBirth).toLocaleDateString()}</p>
                <p><strong>Member Number:</strong> {customer.memberNumber}</p>
                <p><strong>Interest:</strong> {customer.interest || "No interest provided"}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No customers found.</p>
        )}
      </div>
    </div>
  );
}
