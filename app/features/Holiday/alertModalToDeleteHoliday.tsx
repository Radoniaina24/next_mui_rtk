import { useDeleteHolidayMutation } from "@/lib/api/holidayApi";
import { useHolidayContext } from "@/lib/context/HolidayContext";
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
export default function AlertlDeleteHoliday() {
  const {
    showAlert,
    handleCloseAlertToDeleteHoliday,
    id,
    setId,
    handleDeleteHoliday,
  } = useHolidayContext();
  async function delHoliday() {
    await handleDeleteHoliday(id);
    handleCloseAlertToDeleteHoliday();
    setId("");
  }
  return (
    <Modal
      open={showAlert}
      onClose={handleCloseAlertToDeleteHoliday}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography sx={{ textAlign: "center" }}>
          Êtes-vous sûr de vouloir supprimer ?
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
            onClick={() => delHoliday()}
          >
            Supprimer
          </Button>
          <Button
            variant="contained"
            color="warning"
            size="small"
            onClick={() => handleCloseAlertToDeleteHoliday()}
          >
            Annuler
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
