import { useEffect, useState } from "react";
import { Button, Input, Table } from "@nextui-org/react";

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editing, setEditing] = useState<number | null>(null);

  // Ambil data dari API
  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Tambah produk
  const handleAdd = async () => {
    if (!name || !price) return alert("Nama & harga wajib diisi");
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price: parseFloat(price) }),
    });
    setName("");
    setPrice("");
    fetchProducts();
  };

  // Edit produk
  const handleEdit = async (id: number) => {
    await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price: parseFloat(price) }),
    });
    setName("");
    setPrice("");
    setEditing(null);
    fetchProducts();
  };

  // Hapus produk
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus produk ini?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Manajemen Produk</h1>

      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Nama produk"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Harga"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {editing ? (
          <Button color="primary" onClick={() => handleEdit(editing)}>
            Simpan
          </Button>
        ) : (
          <Button color="primary" onClick={handleAdd}>
            Tambah
          </Button>
        )}
      </div>

      <Table aria-label="Tabel Produk">
        <Table.Header>
          <Table.Column>Nama</Table.Column>
          <Table.Column>Harga</Table.Column>
          <Table.Column>Aksi</Table.Column>
        </Table.Header>
        <Table.Body>
          {products.map((p) => (
            <Table.Row key={p.id}>
              <Table.Cell>{p.name}</Table.Cell>
              <Table.Cell>Rp {p.price.toLocaleString()}</Table.Cell>
              <Table.Cell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    color="secondary"
                    onClick={() => {
                      setEditing(p.id);
                      setName(p.name);
                      setPrice(p.price.toString());
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    color="danger"
                    onClick={() => handleDelete(p.id)}
                  >
                    Hapus
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
