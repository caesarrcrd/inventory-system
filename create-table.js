import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function createTable() {
  try {
    await client.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        price NUMERIC NOT NULL,
        stock INT NOT NULL
      )
    `);
    console.log("✅ Tabel products berhasil dibuat");
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await client.end();
  }
}

createTable();
