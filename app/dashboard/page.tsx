"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();

  // Redirect to login if user is not authenticated (restore this logic after testing)
 // useEffect(() => {
   // const user = localStorage.getItem("user");
    //if (!user) {
     // router.push("/login");
   // }
  //}, [router]);

  return (
    <div className="h-screen flex bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <nav className="space-y-4">
          <button className="w-full text-left px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600">
            Add Products
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600">
            Manage Stock
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600">
            Update Prices
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600">
            Upload Photos
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500">
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-900 text-white">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Welcome, Admin!</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500">
            Add New Product
          </button>
        </header>

        {/* Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Cards */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Total Products</h2>
            <p className="text-4xl font-bold">120</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Low Stock Items</h2>
            <p className="text-4xl font-bold">5</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Total Sales</h2>
            <p className="text-4xl font-bold">$25,000</p>
          </div>
        </div>

        {/* Recent Activities */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-4">
            <li className="bg-gray-800 p-4 rounded-lg">
              <p>Added 10 units of "Guitar Amp" to stock.</p>
              <p className="text-gray-500 text-sm">2 hours ago</p>
            </li>
            <li className="bg-gray-800 p-4 rounded-lg">
              <p>Updated price of "Electric Guitar" to $1,200.</p>
              <p className="text-gray-500 text-sm">5 hours ago</p>
            </li>
            <li className="bg-gray-800 p-4 rounded-lg">
              <p>Uploaded new product photos for "Drum Set".</p>
              <p className="text-gray-500 text-sm">1 day ago</p>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
