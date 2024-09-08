import Mail from "@/app/interface/mail";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useState } from "react";
import DialogMail from "./dialog";
import AddFormMail from "./form";
import BorderColorIcon from "@mui/icons-material/BorderColor";

export const EditButton = ({ row }: { row: Mail }) => {
  const [open, setOpen] = useState<boolean>(false);

  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <GridActionsCellItem
        icon={<BorderColorIcon color="primary" />}
        label="Edit"
        onClick={() => setOpen(true)}
      />
      <DialogMail {...{ open, onClose }}>
        <AddFormMail mail={row as Mail} handleClose={onClose} />
      </DialogMail>
    </>
  );
};
