"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, googleProvider } from "../../utils/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
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
    <div className="flex items-center justify-center min-h-screen bg-dark-bg">
      <div className="bg-dark-gray text-light-text p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-6">¡Bienvenido!</h1>
        <p className="text-center mb-6">
          Inicia sesión para explorar nuevas experiencias musicales
        </p>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-light-text placeholder-gray-400"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-light-text placeholder-gray-400"
          />
          <button
            type="submit"
            className="w-full py-2 bg-custom-yellow text-black font-bold rounded-lg hover:bg-custom-hover-yellow transition"
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-2 w-full py-2 mt-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition"
        >
          <img
            src="/google-icon.svg"
            alt="Google Icon"
            className="w-5 h-5"
          />
          Inicia Sesión con Google
        </button>

        {/* Register Link */}
        <p className="text-center mt-6 text-sm">
          ¿No tienes una cuenta?{" "}
          <button
            onClick={handleRegisterRedirect}
            className="text-custom-yellow underline hover:text-custom-hover-yellow"
          >
            Regístrate
          </button>
        </p>
      </div>
    </div>
  );
}
