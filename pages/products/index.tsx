import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (e: any) => {
    e.preventDefault();
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price }),
    });
    setName(""); setPrice("");
    fetchProducts();
  };

  const deleteProduct = async (id: number) => {
    await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchProducts();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Daftar Produk</h1>
        <button onClick={() => signOut()} className="text-red-500">Keluar</button>
      </div>
      <form onSubmit={addProduct} className="flex gap-2 mb-6">
        <input type="text" placeholder="Nama produk" className="border p-2 rounded flex-1"
          value={name} onChange={(e) => setName(e.target.value)} />
        <input type="number" placeholder="Harga (Rp)" className="border p-2 rounded w-40"
          value={price} onChange={(e) => setPrice(e.target.value)} />
        <button className="bg-blue-600 text-white px-4 rounded">Tambah</button>
      </form>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">Nama</th>
            <th className="p-2 border">Harga (Rp)</th>
            <th className="p-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="p-2 border">{p.name}</td>
              <td className="p-2 border">{parseInt(p.price).toLocaleString("id-ID")}</td>
              <td className="p-2 border">
                <button onClick={() => deleteProduct(p.id)} className="text-red-600">Hapus</button>
              </td>
            </tr>
          ))}
          {products.length === 0 && <tr><td colSpan={3} className="p-2 text-center">Belum ada produk</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
