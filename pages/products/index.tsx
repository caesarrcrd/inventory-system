import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Input, Modal, Table } from "@nextui-org/react";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  // Fetch data
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetch products", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle submit
  const handleSubmit = async () => {
    if (!name || !price || !stock) return alert("Isi semua field");

    const productData = {
      name,
      price: parseFloat(price),
      stock: parseInt(stock),
    };

    try {
      if (editId) {
        // Update
        await axios.put(`/api/products/${editId}`, productData);
      } else {
        // Create
        await axios.post("/api/products", productData);
      }
      fetchProducts();
      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      console.error("Error submit", err);
    }
  };

  // Delete
  const handleDelete = async (id: number) => {
    if (!confirm("Hapus produk ini?")) return;
    try {
      await axios.delete(`/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Error delete", err);
    }
  };

  const resetForm = () => {
    setEditId(null);
    setName("");
    setPrice("");
    setStock("");
  };

  // Edit
  const handleEdit = (p: Product) => {
    setEditId(p.id);
    setName(p.name);
    setPrice(String(p.price));
    setStock(String(p.stock));
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">📦 Daftar Produk</h1>
          <Button
            color="primary"
            onPress={() => {
              resetForm();
              setIsModalOpen(true);
            }}
          >
            + Tambah Produk
          </Button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Memuat data...</p>
        ) : (
          <Table
            aria-label="Tabel produk"
            shadow="none"
            removeWrapper
            lined
            headerLined
          >
            <Table.Header>
              <Table.Column>ID</Table.Column>
              <Table.Column>Nama</Table.Column>
              <Table.Column>Harga</Table.Column>
              <Table.Column>Stok</Table.Column>
              <Table.Column>Aksi</Table.Column>
            </Table.Header>
            <Table.Body>
              {products.map((p) => (
                <Table.Row key={p.id}>
                  <Table.Cell>{p.id}</Table.Cell>
                  <Table.Cell>{p.name}</Table.Cell>
                  <Table.Cell>Rp {p.price.toLocaleString()}</Table.Cell>
                  <Table.Cell>{p.stock}</Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2">
                      <Button size="sm" color="warning" onPress={() => handleEdit(p)}>
                        Edit
                      </Button>
                      <Button size="sm" color="danger" onPress={() => handleDelete(p.id)}>
                        Hapus
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </div>

      {/* Modal Tambah/Edit */}
      <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen} size="lg">
        <Modal.Content>
          <Modal.Header>
            {editId ? "✏️ Edit Produk" : "➕ Tambah Produk"}
          </Modal.Header>
          <Modal.Body>
            <Input
              label="Nama Produk"
              placeholder="Masukkan nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Harga"
              type="number"
              placeholder="Masukkan harga"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Input
              label="Stok"
              type="number"
              placeholder="Masukkan stok"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button color="default" variant="flat" onPress={() => setIsModalOpen(false)}>
              Batal
            </Button>
            <Button color="primary" onPress={handleSubmit}>
              Simpan
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </div>
  );
}
