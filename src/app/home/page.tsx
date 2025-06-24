/* eslint-disable @next/next/no-img-element */
"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/header";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="relative min-h-screen w-screen overflow-hidden">
      <img src="/login.jpg" alt="Background" className="absolute h-full w-full object-cover brightness-90" />
<div className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm" />
<div className="relative z-10 p-10">
        <Header />
        <h1 className="text-4xl font-extrabold mb-10 text-white drop-shadow-lg text-center">
          Welcome, {session?.user?.email}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="p-8 bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 text-white text-center">
            <h2 className="text-xl font-bold mb-2">Total Carpets</h2>
            <p className="text-3xl font-bold">124</p>
          </div>
          <div className="p-8 bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 text-white text-center">
            <h2 className="text-xl font-bold mb-2">Active Sales</h2>
            <p className="text-3xl font-bold">12</p>
          </div>
          <div className="p-8 bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 text-white text-center">
            <h2 className="text-xl font-bold mb-2">New Arrivals</h2>
            <p className="text-3xl font-bold">5</p>
          </div>
          <div className="p-8 bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 text-white text-center">
            <h2 className="text-xl font-bold mb-2">Pending Orders</h2>
            <p className="text-3xl font-bold">3</p>
          </div>
        </div>
      </div>
    </div>
  );
}
