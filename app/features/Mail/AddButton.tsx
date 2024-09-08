import React, { useState } from "react";
import DialogMail from "./dialog";
import AddFormMail from "./form";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button } from "@mui/material";
export default function AddButton() {
  const [open, setOpen] = useState<boolean>(false);
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        color="primary"
        variant="contained"
        size="small"
        sx={{ marginRight: "5px", paddingX: "15px" }}
        startIcon={<AddCircleOutlineIcon />}
        onClick={() => setOpen(true)}
        sx={{ marginTop: "20px" }}
      >
        Ajouter
      </Button>
      <DialogMail {...{ open, onClose }}>
        <AddFormMail handleClose={onClose} />
      </DialogMail>
    </>
  );
}
