import { Modal, Box, IconButton } from "@mui/material";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";
import React from "react";
import { useMailContext } from "@/lib/context/MailContext";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: 500,
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};
export default function ModalMail({ children }: any) {
  const { showModal, handleCloseModalMail } = useMailContext();
  return (
    <Modal
      open={showModal}
      onClose={handleCloseModalMail}
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
          <IconButton color="error" onClick={handleCloseModalMail}>
            <CancelPresentationOutlinedIcon />
          </IconButton>
        </Box>
        {children}
      </Box>
    </Modal>
  );
}
