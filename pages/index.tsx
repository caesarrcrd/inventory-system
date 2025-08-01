// pages/index.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center flex-col">
      <h1 className="text-2xl mb-4">Inventory System</h1>
      <Link href="/login" className="bg-blue-500 text-white px-4 py-2">
        Login
      </Link>
    </div>
  );
}
