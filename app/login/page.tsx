"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, googleProvider } from "../../utils/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { Moon, Sun } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("user", "authenticated"); // Store authentication state
      router.push("/dashboard"); // Redirect to dashboard after login
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      localStorage.setItem("user", "authenticated");
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleRegisterRedirect = () => {
    router.push("/register");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`flex flex-col md:flex-row ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen`}
    >
      {/* Left Section (Banner) */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-br from-blue-500 to-purple-700 p-10">
        <div className="text-center text-white space-y-6">
          <h1 className="text-4xl font-bold">¡Bienvenido!</h1>
          <p className="text-lg">Inicia sesión para explorar nuevas experiencias musicales.</p>
        </div>
      </div>

      {/* Right Section (Form) */}
      <div className="flex flex-col flex-1 items-center justify-center px-6 py-10 relative">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="absolute top-4 right-4 text-lg p-2 rounded-full bg-gray-700 hover:bg-gray-500 text-white"
        >
          {darkMode ? <Moon /> : <Sun />}
        </button>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            >
              Iniciar Sesión
            </button>
          </form>

          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-red-500 text-white p-3 rounded-lg flex items-center justify-center gap-2 mt-4 hover:bg-red-600 transition"
          >
            <img src="/google-icon.svg" alt="Google Icon" className="w-5 h-5" />
            Inicia Sesión con Google
          </button>
          <p className="mt-4 text-sm text-center">
            ¿No tienes una cuenta?{" "}
            <button
              onClick={handleRegisterRedirect}
              className="text-blue-500 underline"
            >
              Regístrate
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
