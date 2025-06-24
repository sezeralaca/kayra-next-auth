"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();

  return (
    <div className="w-full flex justify-between items-center mb-10">
      <div className="text-3xl font-bold text-white drop-shadow-lg">
        Kayra Export
      </div>
      <div>
        {session ? (
          <>
            <Link href="/home" className="mr-4 text-white font-semibold">Home</Link>
            <Link href="/dashboard" className="mr-4 text-white font-semibold">Dashboard</Link>
            <button
              onClick={() => signOut()}
              className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn("auth0")}
            className="py-2 px-6 bg-white/30 hover:bg-white/50 text-white font-semibold rounded-lg shadow-md backdrop-blur-sm transition duration-300"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}
