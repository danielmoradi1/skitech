const { Pool } = require("pg");
require("dotenv").config(); // Laddar miljövariabler från .env

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432, // Standard PostgreSQL-port
  ssl: { rejectUnauthorized: false }, // Krävs ofta vid fjärranslutningar
});

// Kontrollera anslutning
pool
  .connect()
  .then(() => console.log("✅ Databasen är ansluten!"))
  .catch((err) => console.error("❌ Fel vid databaskoppling:", err.message));

module.exports = pool;
