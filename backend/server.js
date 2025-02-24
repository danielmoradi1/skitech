const express = require("express");
const cors = require("cors");
const pool = require("./database"); 
require("dotenv").config(); 
const multer = require("multer");
const excelJS = require("exceljs");

const app = express();
app.use(cors()); 
app.use(express.json()); 
console.log("Miljövariabler:", process.env);

const storage = multer.memoryStorage();
const upload = multer({ storage });



// GET METODEN
app.get("/api/products/search", async (req, res) => {
  try {
    const { query } = req.query;

    let sqlQuery = "SELECT * FROM products WHERE 1=1";
    let params = [];

    if (query) {
      sqlQuery += " AND (LOWER(product_name) LIKE LOWER($1) OR LOWER(type) LIKE LOWER($1))";
      params.push(`%${query}%`);
    }

    const { rows } = await pool.query(sqlQuery, params);
    res.json(rows);
  } catch (err) {
    console.error("Fel vid sökning:", err);
    res.status(500).json({ error: "Fel vid sökning!" });
  }
});




app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Ingen fil uppladdad!" });
    }

    const workbook = new excelJS.Workbook();
    await workbook.xlsx.load(req.file.buffer);
    const worksheet = workbook.getWorksheet(1);

    let products = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        products.push([
          row.getCell(1).value, // product_id
          row.getCell(2).value, // product_name
          row.getCell(3).value, // type
          row.getCell(4).value, // price
          row.getCell(5).value, // quantity
        ]);
      }
    });

    // Kör en batch insert eller update
    for (let product of products) {
      await pool.query(
        `INSERT INTO products (product_id, product_name, type, price, quantity)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (product_id) DO UPDATE 
         SET product_name = EXCLUDED.product_name,
             type = EXCLUDED.type,
             price = EXCLUDED.price,
             quantity = EXCLUDED.quantity`,
        product
      );
    }

    res.json({ message: "Excel-data sparad eller uppdaterad i databasen!" });
  } catch (err) {
    console.error("Fel vid uppladdning:", err);
    res.status(500).json({ error: "Fel vid uppladdning! Försök igen." });
  }
});


// 📌 API: Radera en produkt baserat på product_id
app.delete("/api/products/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    const result = await pool.query("DELETE FROM products WHERE product_id = $1 RETURNING *", [productId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Produkten hittades inte!" });
    }

    res.json({ message: "Produkten har raderats!", deletedProduct: result.rows[0] });
  } catch (err) {
    console.error("Fel vid radering:", err);
    res.status(500).json({ error: "Fel vid radering! Försök igen." });
  }
});



const PORT = process.env.SERVER_PORT || 5001;
console.log(`Använder port: ${PORT}`);

app.listen(PORT, () =>
  console.log(`✅ Servern körs på http://localhost:${PORT}`)
);
