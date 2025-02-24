import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const ProductList = ({ products, onDelete }) => {
  return (
    <TableContainer component={Paper} style={{ marginTop: "20px" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Produkt ID</b>
            </TableCell>
            <TableCell>
              <b>Namn</b>
            </TableCell>
            <TableCell>
              <b>Kategori</b>
            </TableCell>
            <TableCell>
              <b>Pris</b>
            </TableCell>
            <TableCell>
              <b>Antal</b>
            </TableCell>
            <TableCell>
              <b>Radera</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.product_id}>
              <TableCell>{product.product_id}</TableCell>
              <TableCell>{product.product_name}</TableCell>
              <TableCell>{product.type}</TableCell>
              <TableCell>{product.price} SEK</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => onDelete(product.product_id)}
                >
                  Radera
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired, 
  onDelete: PropTypes.func.isRequired, 
};

export default ProductList;
