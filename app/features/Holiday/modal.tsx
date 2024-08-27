import { Modal, Box, IconButton } from "@mui/material";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";
import React from "react";
import { useHolidayContext } from "@/lib/context/HolidayContext";
const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  width: 380,
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};
export default function ModalHoliday({ children }: any) {
  const { showModal, handleCloseModalHoliday } = useHolidayContext();
  return (
    <Modal
      open={showModal}
      onClose={handleCloseModalHoliday}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 6,
            border: "none !important",
            outline: "none !important",
          }}
        >
          <IconButton color="error" onClick={handleCloseModalHoliday}>
            <CancelPresentationOutlinedIcon />
          </IconButton>
        </Box>
        {children}
      </Box>
    </Modal>
  );
}
