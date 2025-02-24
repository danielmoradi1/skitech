import { useState } from "react";
import { searchProducts, deleteProduct } from "../services/apiService";
import Swal from "sweetalert2"; // Importera SweetAlert
import { TextField, Button } from "@mui/material";
import ProductList from "./ProductList"; // Importera den nya komponenten

const SearchProduct = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);

  const handleSearch = async () => {
    const data = await searchProducts(query);
    setProducts(data);
  };

  // Radera en produkt
  const handleDelete = async (productId) => {
    Swal.fire({
      title: "Är du säker?",
      text: "Detta kan inte ångras!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ja, radera!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteProduct(productId);
        Swal.fire("Raderad!", response.message, "success");

        // Uppdatera listan efter radering
        setProducts(
          products.filter((product) => product.product_id !== productId)
        );
      }
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          background: "#f0f0f0",
          padding: "10px",
          borderRadius: "5px",
          gap: "1em",
        }}
      >
        <TextField
          label="Produktnamn eller kategori"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ marginRight: "10px", width: "500px" }}
        />
        <Button
          style={{ width: "300px", background:'3084D7' }}
          variant="contained"
          color="primary"
          onClick={handleSearch}
        >
          Sök
        </Button>
      </div>

      {products.length > 0 && (
        <ProductList products={products} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default SearchProduct;
