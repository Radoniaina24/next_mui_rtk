import { useDeleteOtherMutation } from "@/lib/api/otherApi";
import { useOtherContext } from "@/lib/context/OtherContext";
import { Modal, Box, Typography, Button } from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  width: 500,
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};
export default function AlertlDeleteOther() {
  const { showAlert, handleCloseAlertToDeleteOther, id, setId } =
    useOtherContext();
  const [deleteOther, responseDeleteOther] = useDeleteOtherMutation();
  async function delOther() {
    await deleteOther(id);
    handleCloseAlertToDeleteOther();
    setId("");
  }
  return (
    <Modal
      open={showAlert}
      onClose={handleCloseAlertToDeleteOther}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography sx={{ textAlign: "center" }}>
          Êtes-vous sûr de vouloir supprimer définitivement cet element?
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            marginTop: "1.2rem",
          }}
        >
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => delOther()}
          >
            Supprimer
          </Button>
          <Button
            variant="contained"
            color="warning"
            size="small"
            onClick={() => handleCloseAlertToDeleteOther()}
          >
            Annuler
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
