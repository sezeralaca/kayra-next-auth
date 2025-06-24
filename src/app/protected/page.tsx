import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-4">Protected Page</h1>
      <pre className=" p-4 rounded">{JSON.stringify(session, null, 2)}</pre>
    </main>
  );
}
