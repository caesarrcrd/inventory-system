import type { NextApiRequest, NextApiResponse } from "next";
import pool from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Product not found" });
      }
      return res.status(200).json(result.rows[0]);
    }

    if (req.method === "PUT") {
      const { name, price, stock } = req.body;
      await pool.query(
        "UPDATE products SET name=$1, price=$2, stock=$3 WHERE id=$4",
        [name, price, stock, id]
      );
      return res.status(200).json({ message: "Product updated" });
    }

    if (req.method === "DELETE") {
      await pool.query("DELETE FROM products WHERE id = $1", [id]);
      return res.status(200).json({ message: "Product deleted" });
    }

    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
