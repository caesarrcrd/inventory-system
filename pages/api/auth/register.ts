import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Metode tidak diizinkan" });

  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "Semua field wajib diisi" });

  const cek = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  if (cek.rows.length > 0) return res.status(400).json({ message: "Email sudah terdaftar" });

  const hashed = await bcrypt.hash(password, 10);
  await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [name, email, hashed]);

  return res.status(200).json({ message: "Akun berhasil dibuat" });
}
