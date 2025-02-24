import { Container, Typography } from "@mui/material";
import UploadFile from "./components/UploadFile";
import SearchProduct from "./components/SearchProduct";

function App() {
  return (
    <Container maxWidth="md" style={{ textAlign: "center", marginTop: "10px" }}>
      <Typography className="container">
        <h1
          style={{ filter: "drop-shadow(4px 4px 6px rgba(0, 0, 0, 0.6))" }}
        >
          Eskitech
        </h1>
        <UploadFile />
      </Typography>
      <SearchProduct />
    </Container>
  );
}

export default App;
