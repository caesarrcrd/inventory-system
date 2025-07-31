import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { name, price, stock } = body;
    await pool.query(
      "UPDATE products SET name = $1, price = $2, stock = $3 WHERE id = $4",
      [name, price, stock, params.id]
    );
    return NextResponse.json({ message: "Produk berhasil diupdate" });
  } catch (error) {
    return NextResponse.json({ error: "Gagal update produk" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await pool.query("DELETE FROM products WHERE id = $1", [params.id]);
    return NextResponse.json({ message: "Produk berhasil dihapus" });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menghapus produk" }, { status: 500 });
  }
}