import type { NextApiRequest, NextApiResponse } from "next";
import  Pool  from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const { name, price, stock } = req.body;
    await pool.query("UPDATE products SET name=$1, price=$2, stock=$3 WHERE id=$4", [name, price, stock, id]);
    return res.status(200).json({ message: "Produk diperbarui" });
  }

  if (req.method === "DELETE") {
    await pool.query("DELETE FROM products WHERE id=$1", [id]);
    return res.status(200).json({ message: "Produk dihapus" });
  }

  res.status(405).end();
}
