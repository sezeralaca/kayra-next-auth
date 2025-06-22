"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
    <div className="relative flex items-center justify-center h-screen bg-gradient-to-br from-[#B2453C] via-[#E0A96D] to-[#FFE8C2] overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('/turkish-pattern.svg')] bg-repeat"></div>

      <div className="backdrop-blur-lg bg-white/20 rounded-3xl p-14 w-[500px] text-center shadow-2xl border border-white/30 z-10">
        <h1 className="text-5xl font-extrabold mb-8 text-white drop-shadow-lg">
          CaaS - Carpet as a Service
        </h1>
        <p className="text-white mb-8 text-lg">
          Manage your authentic Turkish carpets with modern technology.
          Carpets, Rugs, Travel  
        </p>
        
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
