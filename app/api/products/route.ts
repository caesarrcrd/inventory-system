// app/api/products/route.ts
import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  const result = await pool.query("SELECT * FROM products ORDER BY id ASC");
  return NextResponse.json(result.rows);
}

export async function POST(req: Request) {
  const { name, price, stock } = await req.json();
  await pool.query("INSERT INTO products (name, price, stock) VALUES ($1,$2,$3)", [name, price, stock]);
  return NextResponse.json({ message: "Product added" });
}
