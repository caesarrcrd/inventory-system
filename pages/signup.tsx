import { useRouter } from "next/router";
import { useState } from "react";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(""); setSuccess("");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess(data.message);
      setTimeout(() => router.push("/signin"), 1500);
    } else setError(data.message);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h1 className="text-xl font-bold mb-4">Daftar Akun</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}
        <input type="text" placeholder="Nama Lengkap" className="w-full border p-2 mb-3 rounded"
          value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" className="w-full border p-2 mb-3 rounded"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full border p-2 mb-3 rounded"
          value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Daftar</button>
        <p className="mt-3 text-sm text-center">
          Sudah punya akun?{" "}
          <a href="/signin" className="text-blue-600">Masuk</a>
        </p>
      </form>
    </div>
  );
}
