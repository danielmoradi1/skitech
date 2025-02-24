import { useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { TiUpload } from "react-icons/ti";
import Swal from "sweetalert2"; // Importera SweetAlert
import { uploadFile } from "../services/apiService"; // Använd API-service

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Hantera filval
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      selectedFile.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setFile(selectedFile);
    } else {
      Swal.fire({
        icon: "error",
        title: "Felaktig filtyp",
        text: "Endast Excel-filer (*.xlsx) är tillåtna!",
      });
    }
  };

  // Hantera filuppladdning
  const handleUpload = async () => {
    if (!file) {
      Swal.fire({
        icon: "warning",
        title: "Ingen fil vald",
        text: "Välj en Excel-fil först!",
      });
      return;
    }

    setUploading(true);
    try {
      const response = await uploadFile(file);
      Swal.fire({
        icon: "success",
        title: "Uppladdning lyckades!",
        text: response.message,
      });
      setFile(null);
      handleClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Fel vid uppladdning",
        text: "Något gick fel! Försök igen.",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <TiUpload
        size={40}
        color="#fff"
        style={{
          cursor: "pointer",
          marginBottom: "10px",
          filter: "drop-shadow(4px 4px 6px rgba(84, 84, 84, 0.63))",
        }}
        onClick={handleOpen}
      />

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2" color="#000">
            Ladda upp Excel-fil
          </Typography>
          <input
            type="file"
            accept=".xlsx"
            onChange={handleFileChange}
            style={{
              marginTop: "10px",
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="outlined" onClick={handleClose}>
              Stäng
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? "Laddar upp..." : "Skicka"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default UploadFile;
