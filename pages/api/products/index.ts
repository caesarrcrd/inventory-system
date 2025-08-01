import { pool } from "../../../lib/db";
import { getToken } from "next-auth/jwt";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return res.status(401).json({ message: "Harus login" });

  const client = await pool.connect();
  try {
    if (req.method === "GET") {
      const result = await client.query("SELECT * FROM products ORDER BY id DESC");
      return res.status(200).json(result.rows);
    }

    if (req.method === "POST") {
      const { name, price, stock } = req.body;
      await client.query("INSERT INTO products (name, price, stock) VALUES ($1, $2, $3)", [name, price, stock]);
      return res.status(201).json({ message: "Produk berhasil ditambahkan" });
    }

    if (req.method === "PUT") {
      const { id, name, price, stock } = req.body;
      await client.query("UPDATE products SET name=$1, price=$2, stock=$3 WHERE id=$4", [name, price, stock, id]);
      return res.status(200).json({ message: "Produk berhasil diperbarui" });
    }

    if (req.method === "DELETE") {
      const { id } = req.body;
      await client.query("DELETE FROM products WHERE id=$1", [id]);
      return res.status(200).json({ message: "Produk berhasil dihapus" });
    }

    res.status(405).end();
  } finally {
    client.release();
  }
}
