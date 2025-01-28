"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();

  // Redirect to login if user is not authenticated (replace with your auth logic)
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800 text-white">
      <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
    </div>
  );
}
