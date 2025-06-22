"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-blue-500">
      <div className="backdrop-blur-lg bg-white/20 rounded-3xl p-10 w-[600px] text-center shadow-2xl border border-white/30">
        <h1 className="text-4xl font-extrabold mb-4 text-white drop-shadow-lg">Home</h1>
        <p className="text-white mb-4">Giriş Yaptın: {session?.user?.email}</p>
        <Link
          href="/dashboard"
          className="block mb-4 py-3 px-6 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
        >
          Dashboard'a Git
        </Link>
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
