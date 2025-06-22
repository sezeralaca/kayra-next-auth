"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Hata mesajını URL parametresinden almak için (optional)
  // Bunu daha sonra middleware ile yönlendirmede kullanabilirsin

  async function handleSignIn(provider: string) {
    setLoadingProvider(provider);
    setError(null);
    try {
      await signIn(provider);
      // signIn otomatik yönlendirme yapar
    } catch (err) {
        console.error("Login error:", err);
      setError("Login failed. Please try again.");
      setLoadingProvider(null);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-tr from-purple-700 via-pink-600 to-indigo-800 flex flex-col items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-10 max-w-md w-full shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-white text-center">Welcome Back</h1>
        <p className="text-center text-white/80 mb-8">
          Please sign in to continue
        </p>

        {error && (
          <div className="mb-4 text-center text-red-400 font-semibold">
            {error}
          </div>
        )}

        <button
          disabled={!!loadingProvider}
          onClick={() => handleSignIn("auth0")}
          className={`w-full py-3 mb-4 text-white font-semibold rounded-lg transition 
            ${loadingProvider === "auth0" ? "bg-white/40 cursor-wait" : "bg-white/20 hover:bg-white/40"}`}
        >
          {loadingProvider === "auth0" ? "Signing in..." : "Sign in with Auth0"}
        </button>

        <button
          disabled={!!loadingProvider}
          onClick={() => handleSignIn("github")}
          className={`w-full py-3 mb-4 text-white font-semibold rounded-lg transition
            ${loadingProvider === "github" ? "bg-white/40 cursor-wait" : "bg-white/20 hover:bg-white/40"}`}
        >
          {loadingProvider === "github" ? "Signing in..." : "Sign in with GitHub"}
        </button>

        <button
          disabled={!!loadingProvider}
          onClick={() => handleSignIn("google")}
          className={`w-full py-3 text-white font-semibold rounded-lg transition
            ${loadingProvider === "google" ? "bg-white/40 cursor-wait" : "bg-white/20 hover:bg-white/40"}`}
        >
          {loadingProvider === "google" ? "Signing in..." : "Sign in with Google"}
        </button>
      </div>

      <div className="absolute -bottom-20 left-0 w-full h-60 bg-gradient-to-tr from-pink-400 via-purple-600 to-indigo-700 rounded-full opacity-40 filter blur-3xl animate-pulse"></div>
      <div className="absolute -top-16 right-0 w-40 h-40 bg-gradient-to-tr from-purple-400 via-pink-600 to-indigo-700 rounded-full opacity-50 filter blur-2xl animate-spin"></div>
    </main>
  );
}
