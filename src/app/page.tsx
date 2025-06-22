"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/home");
    }
  }, [session, router]);

  if (status === "loading") {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="backdrop-blur-lg bg-white/20 rounded-3xl p-10 w-96 text-center shadow-2xl border border-white/30">
        <h1 className="text-4xl font-extrabold mb-6 text-white drop-shadow-lg">QuackAuth System</h1>
        <p className="text-white mb-6">Please login with your Auth0 account</p>
        <button
          onClick={() => signIn("auth0")}
          className="w-full py-3 px-6 bg-white/30 hover:bg-white/50 text-white font-semibold rounded-lg shadow-md transition duration-300 backdrop-blur-sm"
        >
          Auth0 ile Giriş Yap
        </button>
      </div>
    </div>
  );
}
