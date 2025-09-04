"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../utils/supabaseClient";
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
  const [darkMode, setDarkMode] = useState<boolean | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  // On mount, set darkMode based on system or localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("darkMode");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(stored === "true" ? true : stored === "false" ? false : prefersDark);
    }
  }, []);

  // Sync dark mode with <html> class for CSS variables
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Correo o contraseña incorrectos.");
      setLoading(false);
      return;
    }
    localStorage.setItem("user", "authenticated");
    router.push("/dashboard");
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) {
      setError("No se pudo iniciar sesión con Google.");
      setLoading(false);
      return;
    }
    localStorage.setItem("user", "authenticated");
    router.push("/dashboard");
    setLoading(false);
  };

  const handleRegisterRedirect = () => {
    router.push("/register");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--text)",
        display: "flex",
        flexDirection: "row",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      {/* Left Section (Banner) */}
      <div
        style={{
          flex: 1,
          display: "none",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, var(--section) 0%, var(--card) 100%)",
          padding: "0 2rem",
        }}
        className="md:flex"
      >
        <div style={{ textAlign: "center", color: "var(--text)", opacity: 0.95 }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: 16 }}>
            ¡Bienvenido!
          </h1>
          <p style={{ fontSize: "1.15rem" }}>
            Inicia sesión para explorar nuevas experiencias musicales y gestionar tu catálogo.
          </p>
        </div>
      </div>

      {/* Right Section (Form) */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1rem",
          position: "relative",
          background: "var(--section)",
        }}
      >
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode((d) => !d)}
          style={{
            position: "absolute",
            top: 24,
            right: 24,
            background: "var(--card)",
            color: "var(--text)",
            border: "1px solid var(--border)",
            borderRadius: "50%",
            padding: 10,
            fontSize: 20,
            cursor: "pointer",
            boxShadow: "var(--shadow)",
            transition: "background 0.2s, color 0.2s",
          }}
          aria-label="Cambiar modo oscuro"
        >
          {darkMode ? <Moon /> : <Sun />}
        </button>

        <div
          style={{
            width: "100%",
            maxWidth: 400,
            background: "var(--card)",
            borderRadius: 16,
            boxShadow: "var(--shadow)",
            padding: "2.5rem 2rem",
            margin: "0 auto",
            border: "1px solid var(--border)",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: 24,
              textAlign: "center",
              color: "var(--accent)",
            }}
          >
            Iniciar Sesión
          </h2>
          {error && (
            <p style={{ color: "#ef4444", fontSize: "0.98rem", marginBottom: 12, textAlign: "center", fontWeight: 500 }}>
              {error}
            </p>
          )}
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid var(--border)",
                borderRadius: 8,
                background: "var(--section)",
                color: "var(--text)",
                fontSize: "1rem",
                outline: "none",
                marginBottom: 4,
              }}
              required
              autoComplete="email"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid var(--border)",
                borderRadius: 8,
                background: "var(--section)",
                color: "var(--text)",
                fontSize: "1rem",
                outline: "none",
                marginBottom: 4,
              }}
              required
              autoComplete="current-password"
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                background: loading ? "var(--muted)" : "var(--accent)",
                color: "var(--bg)",
                padding: "12px",
                borderRadius: 8,
                fontWeight: "bold",
                fontSize: "1.08rem",
                border: "none",
                marginTop: 8,
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "var(--shadow)",
                transition: "background 0.2s",
              }}
            >
              {loading ? "Entrando..." : "Iniciar Sesión"}
            </button>
          </form>

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            style={{
              width: "100%",
              background: "#ea4335",
              color: "#fff",
              padding: "12px",
              borderRadius: 8,
              fontWeight: "bold",
              fontSize: "1.08rem",
              border: "none",
              marginTop: 16,
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "var(--shadow)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              transition: "background 0.2s",
              opacity: loading ? 0.7 : 1,
            }}
          >
            <img src="/google-icon.svg" alt="Google Icon" style={{ width: 20, height: 20 }} />
            Inicia Sesión con Google
          </button>
          <p style={{ marginTop: 18, fontSize: "0.98rem", textAlign: "center", color: "var(--muted)" }}>
            ¿No tienes una cuenta?{" "}
            <button
              onClick={handleRegisterRedirect}
              style={{
                color: "var(--accent)",
                background: "none",
                border: "none",
                textDecoration: "underline",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "1rem",
                padding: 0,
              }}
              disabled={loading}
            >
              Regístrate
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
