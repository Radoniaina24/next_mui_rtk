import React, { useState } from "react";
import DialogPermission from "./dialog";
import AddFormPermission from "./form";
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
      <DialogPermission {...{ open, onClose }}>
        <AddFormPermission handleClose={onClose} />
      </DialogPermission>
    </>
  );
}
