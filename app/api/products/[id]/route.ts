// app/api/products/[id]/route.ts
import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { name, price, stock } = await req.json();
  await pool.query("UPDATE products SET name=$1, price=$2, stock=$3 WHERE id=$4", [
    name,
    price,
    stock,
    params.id,
  ]);
  return NextResponse.json({ message: "Product updated" });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await pool.query("DELETE FROM products WHERE id=$1", [params.id]);
  return NextResponse.json({ message: "Product deleted" });
}
