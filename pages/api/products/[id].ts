// pages/api/products/[id].ts
import { NextApiRequest, NextApiResponse } from "next";
import pool from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const { name, price, stock } = req.body;
    const result = await pool.query(
      "UPDATE products SET name=$1, price=$2, stock=$3 WHERE id=$4 RETURNING *",
      [name, price, stock, id]
    );
    return res.status(200).json(result.rows[0]);
  }

  if (req.method === "DELETE") {
    await pool.query("DELETE FROM products WHERE id=$1", [id]);
    return res.status(204).end();
  }

  res.status(405).json({ message: "Method not allowed" });
}
