"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, googleProvider } from "../../utils/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard"); // Redirect to dashboard after login
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/dashboard"); // Redirect to dashboard after Google login
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleRegisterRedirect = () => {
    router.push("/register"); // Redirect to a register page
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="p-6 bg-white rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white p-2 rounded mb-2"
          >
            Login
          </button>
        </form>
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-blue-500 text-white p-2 rounded flex items-center justify-center gap-2"
        >
          <img
            src="/google-icon.svg" // Replace with a path to your Google icon
            alt="Google Icon"
            className="w-4 h-4"
          />
          Sign in with Google
        </button>
        <p className="mt-4 text-sm text-center">
          Don't have an account?{" "}
          <button
            onClick={handleRegisterRedirect}
            className="text-blue-500 underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
