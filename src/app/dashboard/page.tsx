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
      router.push("/");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-4">Admin Dashboard</h1>
      <p>Hoşgeldin {session?.user?.email}</p>
      <button
        onClick={() => signOut()}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Çıkış Yap
      </button>
    </div>
  );
}
