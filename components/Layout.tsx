// components/Layout.tsx
import React from "react";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-lg font-semibold">Inventory System</h1>
          <nav>
            <Link href="/" className="mr-4 hover:underline">
              Home
            </Link>
            <Link href="/products" className="hover:underline">
              Products
            </Link>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 text-center py-3 mt-8">
        <p>&copy; 2025 Inventory System</p>
      </footer>
    </div>
  );
}
