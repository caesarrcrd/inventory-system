import type { NextApiRequest, NextApiResponse } from "next";
import pool from "../../lib/db";
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { email, name, password } = req.body;

  const client = await pool.connect();
  try {
    const check = await client.query("SELECT * FROM users WHERE email=$1", [email]);
    if (check.rowCount > 0) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await client.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [name, email, hashedPassword]);
    res.status(201).json({ message: "User dibuat" });
  } finally {
    client.release();
  }
}
