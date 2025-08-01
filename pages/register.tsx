import { useState } from "react";
import { useRouter } from "next/router";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Registrasi berhasil! Mengarahkan ke halaman login...");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setMessage(data.message || "Gagal mendaftar");
      }
    } catch (error) {
      setMessage("Terjadi kesalahan koneksi");
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Daftar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
