"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function CustomerCRUD() {
  const { register, handleSubmit, reset } = useForm();
  const [customers, setCustomers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  async function fetchCustomers() {
    setLoading(true);
    try {
      const response = await fetch('/api/allcustomer', {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-store', // Ensure no cache is used
        },
      });
  
      if (!response.ok) throw new Error('Failed to fetch customers');
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  

  const handleCustomerSubmit = async (data) => {
    try {
        const response = await fetch('/api/createcustomer', {
            method: 'POST', // Ensure it's POST
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error in adding customer: ${errorData.error}`);
        }
        alert('Customer added!');
        resetForm();
        fetchCustomers();
    } catch (error) {
        alert(error.message);
        console.log(error);
    }
};
  
  

  // Handle Delete Customer
  const handleDeleteCustomer = async (id) => {
    if (!confirm("Are you sure you want to delete this customer?")) return;

    try {
      const response = await fetch(`/api/customer/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error deleting customer");
      alert("Customer deleted successfully!");
      fetchCustomers(); // Refresh customer list after deletion
    } catch (error) {
      alert(error.message);
    }
  };

  // Reset form and edit state
  const resetForm = () => {
    reset({ name: "", dateOfBirth: "", memberNumber: "", interest: "" });
    setEditMode(false);
    setSelectedCustomer(null);
  };

  // Set customer in edit mode
  const startEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    reset(customer);
    setEditMode(true);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (loading) return <p>Loading customers...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-8">Customer Management</h1>

        {/* Form for adding or editing customers */}
        <form onSubmit={handleSubmit(handleCustomerSubmit)} className="mb-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                {...register("name", { required: true })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Customer Name"
              />
            </div>
            <div>
              <label className="block text-gray-700">Date of Birth</label>
              <input
                {...register("dateOfBirth", { required: true })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Customer Date of Birth"
                type="date"
              />
            </div>
            <div>
              <label className="block text-gray-700">Member Number</label>
              <input
                {...register("memberNumber", { required: true })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Customer Member Number"
                type="number"
              />
            </div>
            <div>
              <label className="block text-gray-700">Interest</label>
              <input
                {...register("interest")}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Customer Interest"
              />
            </div>
          </div>
          <div className="flex items-center justify-end mt-6">
            {editMode ? (
              <>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white rounded-md mr-4"
                >
                  Update Customer
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 bg-gray-500 text-white rounded-md"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 text-white rounded-md"
              >
                Add Customer
              </button>
            )}
          </div>
        </form>

        {/* List of customers */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Customer List ({customers.length})</h2>
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b-2 border-gray-300">Name</th>
                <th className="px-4 py-2 border-b-2 border-gray-300">Date of Birth</th>
                <th className="px-4 py-2 border-b-2 border-gray-300">Member Number</th>
                <th className="px-4 py-2 border-b-2 border-gray-300">Interest</th>
                <th className="px-4 py-2 border-b-2 border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer._id}>
                  <td className="px-4 py-2 border-b">{customer.name}</td>
                  <td className="px-4 py-2 border-b">{customer.dateOfBirth}</td>
                  <td className="px-4 py-2 border-b">{customer.memberNumber}</td>
                  <td className="px-4 py-2 border-b">{customer.interest}</td>
                  <td className="px-4 py-2 border-b flex space-x-4">
                    <button
                      onClick={() => startEditCustomer(customer)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCustomer(customer._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
