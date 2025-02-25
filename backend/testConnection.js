const pool = require("./database"); // Anslutning till databasen

const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("Anslutning till PostgreSQL lyckades!");
    client.release();
  } catch (err) {
    console.error("Fel vid anslutning:", err.message);
  }
};

// Kör testet
testConnection();
