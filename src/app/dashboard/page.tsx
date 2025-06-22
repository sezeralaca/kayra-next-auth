"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
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
    if (!session?.user.roles?.includes("admin")) {
      router.push("/home");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#7B3F00] to-[#FFD700]">
      <div className="backdrop-blur-lg bg-white/20 rounded-3xl p-10 w-[700px] text-center shadow-2xl border border-white/30">
        <h1 className="text-4xl font-extrabold mb-6 text-white drop-shadow-lg">Admin Dashboard</h1>
        <p className="text-white mb-6">Hoşgeldin {session?.user?.email}</p>
        <div className="bg-white/10 p-6 rounded-xl shadow-inner mb-6">
          <h2 className="text-xl text-white mb-4">Satış İstatistikleri</h2>
          <div className="w-full h-64">
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
        <button
          onClick={() => signOut()}
          className="py-3 px-6 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
        >
          Çıkış Yap
        </button>
      </div>
    </div>
  );
}
