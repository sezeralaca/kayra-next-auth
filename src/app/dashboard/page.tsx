/* eslint-disable @next/next/no-img-element */
"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/header";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const data = [
  { name: 'Jan', sales: 2400 },
  { name: 'Feb', sales: 1398 },
  { name: 'Mar', sales: 9800 },
  { name: 'Apr', sales: 3908 },
  { name: 'May', sales: 4800 },
  { name: 'Jun', sales: 3800 },
];

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user || !session.user.roles?.includes("admin")) {
  router.push("/home");
}

  }, [session, status, router]);

  if (status === "loading") {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="relative min-h-screen w-screen overflow-hidden">
      <img
        src="/menu.jpg"
        alt="Background"
        className="absolute h-full w-full object-cover"
      />
      <div className="inset-0  backdrop-blur-xl" />
      <div className="relative z-10 p-10">
        <Header />
        <h1 className="text-4xl font-extrabold mb-10 text-white drop-shadow-lg text-center">
          Admin Dashboard
        </h1>

        <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/30 text-white">
          <h2 className="text-2xl font-bold mb-6">Sales Performance</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#FFB347" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
