import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputMask from "react-input-mask";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

interface EditModalProps {
  open: boolean;
  onClose: () => void;
  place: { location: string; date: string };
  onSave: (updatedPlace: { location: string; date: string }) => void;
}

const EditModal: React.FC<EditModalProps> = ({ open, onClose, place, onSave }) => {
  const [location, setLocation] = useState(place.location);
  const [date, setDate] = useState(place.date);

  // Sempre que o modal abrir, resetamos os valores para os originais
  useEffect(() => {
    if (open) {
      setLocation(place.location);
      setDate(place.date);
    }
  }, [open, place]);

  const handleSave = () => {
    onSave({ location, date });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 350,
          bgcolor: "#4b9400",
          p: 4,
          boxShadow: 24,
          borderRadius: 2,
        }}
      >
        {/* Botão de fechar */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            color: "white",
          }}
        >
          <CloseIcon />
        </IconButton>

        <h2 style={{ color: "white", textAlign: "center", marginBottom: "20px" }}>
          Editar Lugar
        </h2>

        <div className="input-group">
          <label>Local</label>
          <input
            type="text"
            className="modal-input"
            placeholder="Digite o local que deseja conhecer"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Meta</label>
          <InputMask
            mask="99/9999"
            className="modal-input"
            placeholder="mês/ano"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            mt: 2,
            backgroundColor: "#005c00",
            color: "#ffffff",
            "&:hover": { backgroundColor: "#004400" },
            display: "block",
            width: "100%",
          }}
        >
          Salvar
        </Button>
      </Box>
    </Modal>
  );
};

export default EditModal;
