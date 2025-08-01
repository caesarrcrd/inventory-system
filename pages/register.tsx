import { useState } from "react";
import { useRouter } from "next/router";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    console.log("DEBUG: Submit form dengan", { username, password });

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      console.log("DEBUG: Response status", res.status);

      let data: any = {};
      try {
        data = await res.json();
      } catch {
        console.log("DEBUG: Tidak bisa parse JSON");
      }

      console.log("DEBUG: Data dari API", data);

      if (res.ok) {
        setMessage("✅ Registrasi berhasil! Mengarahkan ke login...");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setMessage(`❌ ${data.message || "Gagal mendaftar"}`);
      }
    } catch (error) {
      console.error("DEBUG: Error fetch", error);
      setMessage("⚠️ Tidak dapat terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ display: "block", margin: "10px 0", width: "100%" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", margin: "10px 0", width: "100%" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: "10px", width: "100%" }}
        >
          {loading ? "Mendaftar..." : "Daftar"}
        </button>
      </form>
      {message && (
        <p style={{ marginTop: "15px", whiteSpace: "pre-wrap" }}>{message}</p>
      )}
    </div>
  );
}
