// pages/api/products/index.ts
import { NextApiRequest, NextApiResponse } from "next";
import pool from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const result = await pool.query("SELECT * FROM products ORDER BY id DESC");
    return res.status(200).json(result.rows);
  }

  if (req.method === "POST") {
    const { name, price, stock } = req.body;
    const result = await pool.query(
      "INSERT INTO products (name, price, stock) VALUES ($1, $2, $3) RETURNING *",
      [name, price, stock]
    );
    return res.status(201).json(result.rows[0]);
  }

  res.status(405).json({ message: "Method not allowed" });
}
