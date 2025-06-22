"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl mb-4">Hoşgeldin {session.user?.email}</h1>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Çıkış Yap
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-4">Giriş Yap</h1>
      <button
        onClick={() => signIn("auth0")}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Auth0 ile Giriş Yap
      </button>
    </div>
  );
}
