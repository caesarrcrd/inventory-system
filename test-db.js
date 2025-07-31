import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  try {
    await client.connect();
    console.log("✅ Koneksi ke database BERHASIL");

    const res = await client.query('SELECT * FROM products LIMIT 5');
    console.log("Data products:", res.rows);
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await client.end();
  }
}

testConnection();
