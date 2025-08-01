import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import pool from "../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) return res.status(400).json({ error: "Lengkapi semua field" });

    const hashed = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING id",
      [name, email, hashed]
    );

    return res.status(200).json({ success: true, userId: result.rows[0].id });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: "Gagal register" });
  }
}
