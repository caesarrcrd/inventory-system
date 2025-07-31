import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function setupDB() {
  try {
    await client.connect();

    // 1. Buat tabel jika belum ada
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        price NUMERIC NOT NULL,
        stock INT NOT NULL
      )
    `);

    console.log("✅ Tabel products berhasil dibuat / sudah ada");

    // 2. Hapus data lama jika ada
    await client.query(`DELETE FROM products`);

    // 3. Tambahkan data dummy
    await client.query(`
      INSERT INTO products (name, price, stock)
      VALUES 
      ('Produk A', 10000, 50),
      ('Produk B', 25000, 30),
      ('Produk C', 5000, 100)
    `);

    console.log("✅ Data dummy berhasil ditambahkan");
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await client.end();
  }
}

setupDB();
