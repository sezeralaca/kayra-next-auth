"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-500 to-green-400">
      <div className="backdrop-blur-lg bg-white/20 rounded-3xl p-10 w-[600px] text-center shadow-2xl border border-white/30">
        <h1 className="text-4xl font-extrabold mb-6 text-white drop-shadow-lg">Admin Dashboard</h1>
        <p className="text-white mb-4">Hoşgeldin {session?.user?.email}</p>
        <div className="bg-white/10 p-6 rounded-xl shadow-inner mb-6">
          <h2 className="text-xl text-white mb-4">Sistem Raporları</h2>
          <ul className="text-white text-left list-disc list-inside">
            <li>Kullanıcı Sayısı: 42</li>
            <li>Aktif Session: 7</li>
            <li>Son Deploy: 2 saat önce</li>
          </ul>
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
