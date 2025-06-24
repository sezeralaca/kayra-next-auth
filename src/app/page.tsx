/* eslint-disable @next/next/no-img-element */
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/app/components/header";

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
    <div className="relative h-screen w-screen overflow-hidden">
      <img
        src="/login.png"
        alt="Background"
        className="absolute h-full w-full object-cover"
      />
      <div className=" absolute inset-0 backdrop-blur-xs" />

      <div className="relative z-10 flex flex-col items-center justify-between h-full p-10">
        <Header />

        <main className="flex flex-col items-center text-center text-white max-w-3xl">
          <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
            Export Management System
          </h1>
          <p className="text-lg mb-10">
            Manage your unique carpet inventory, monitor sales, and grow your business with cutting-edge cloud technology.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl border border-white/30 shadow-lg">
              <h3 className="text-2xl font-bold mb-2">Inventory</h3>
              <p>Track and manage your authentic carpet stock in real-time.</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl border border-white/30 shadow-lg">
              <h3 className="text-2xl font-bold mb-2">Sales Analytics</h3>
              <p>Monitor sales trends and optimize your business performance.</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl border border-white/30 shadow-lg">
              <h3 className="text-2xl font-bold mb-2">Multi-Store</h3>
              <p>Handle multiple stores and warehouses with ease from one place.</p>
            </div>
          </div>
        </main>

        <footer className="text-white text-sm mt-10">
          © 2025 Sezer as a Service - Her türlü halı, kilim, travel.
        </footer>
      </div>
    </div>
  );
}
