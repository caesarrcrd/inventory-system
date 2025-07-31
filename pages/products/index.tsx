import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Daftar Produk</h1>
      <table border={1} cellPadding={10} style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Harga</th>
            <th>Stok</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p: any) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.stock}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>Tidak ada data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
