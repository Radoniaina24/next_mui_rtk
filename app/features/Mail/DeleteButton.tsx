import Mail from "@/app/interface/mail";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useState } from "react";
import DialogMail from "./dialog";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Typography, Box, Button } from "@mui/material";
export const DeleteButton = ({
  row,
  handleDelete,
}: {
  row: Mail;
  handleDelete: (id: any) => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const onClose = () => {
    setOpen(false);
  };
  async function Delete() {
    handleDelete(row?.id);
    onClose();
  }
  return (
    <>
      <GridActionsCellItem
        icon={<DeleteForeverIcon color="error" />}
        label="Delete"
        onClick={() => setOpen(true)}
      />
      <DialogMail {...{ open, onClose }}>
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
            onClick={() => Delete()}
          >
            Supprimer
          </Button>
          <Button
            variant="contained"
            color="warning"
            size="small"
            onClick={onClose}
          >
            Annuler
          </Button>
        </Box>
      </DialogMail>
    </>
  );
};
