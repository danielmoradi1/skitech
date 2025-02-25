const API_URL = "http://localhost:5001/api";

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  return response.json();
};

// Hämta alla produkter
export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  return response.json();
};

// Sök produkter baserat på namn och/eller typ
export const searchProducts = async (query) => {
  const params = new URLSearchParams();
  if (query) params.append("query", query);

  const response = await fetch(
    `${API_URL}/products/search?${params.toString()}`
  );
  return response.json();
};


// Radera en produkt från databasen
export const deleteProduct = async (productId) => {
  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: "DELETE",
  });

  return response.json();
};
