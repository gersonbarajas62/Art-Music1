"use client";

import { useState, useEffect } from "react";
import { db } from "../../utils/firebase"; // Adjust the path if needed
import { collection, getDocs } from "firebase/firestore";

export default function Dashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [lowStockItems, setLowStockItems] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch total products
        const productsSnapshot = await getDocs(collection(db, "products"));
        setTotalProducts(productsSnapshot.size);

        // Fetch low stock items
        const lowStockSnapshot = await getDocs(
          collection(db, "products") // Add a query for low stock, if needed
        );
        const lowStockCount = lowStockSnapshot.docs.filter(
          (doc) => doc.data().stock < 10
        ).length;
        setLowStockItems(lowStockCount);

        // Fetch recent activities
        const activitiesSnapshot = await getDocs(collection(db, "activities"));
        const activities = activitiesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRecentActivities(activities);

        // Example: Fetch total sales from another collection (if applicable)
        const salesSnapshot = await getDocs(collection(db, "sales"));
        const total = salesSnapshot.docs.reduce(
          (sum, doc) => sum + doc.data().amount,
          0
        );
        setTotalSales(total);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

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
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Total Products</h2>
            <p className="text-4xl font-bold">{totalProducts}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Low Stock Items</h2>
            <p className="text-4xl font-bold">{lowStockItems}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Total Sales</h2>
            <p className="text-4xl font-bold">${totalSales}</p>
          </div>
        </div>

        {/* Recent Activities */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-4">
            {recentActivities.map((activity) => (
              <li key={activity.id} className="bg-gray-800 p-4 rounded-lg">
                <p>{activity.description}</p>
                <p className="text-gray-500 text-sm">{activity.timestamp}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
