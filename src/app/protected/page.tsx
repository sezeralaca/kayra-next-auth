import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <h1>Protected Page</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </main>
  );
}
