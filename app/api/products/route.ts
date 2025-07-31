import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY id DESC");
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, price, stock } = body;
    await pool.query(
      "INSERT INTO products (name, price, stock) VALUES ($1, $2, $3)",
      [name, price, stock]
    );
    return NextResponse.json({ message: "Produk berhasil ditambahkan" });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menambahkan produk" }, { status: 500 });
  }
}