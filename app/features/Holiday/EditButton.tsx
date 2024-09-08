import Holiday from "@/app/interface/holiday";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useState } from "react";
import DialogHoliday from "./dialog";
import AddFormHoliday from "./form";
import BorderColorIcon from "@mui/icons-material/BorderColor";

export const EditButton = ({ row }: { row: Holiday }) => {
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
      <DialogHoliday {...{ open, onClose }}>
        <AddFormHoliday holiday={row as Holiday} handleClose={onClose} />
      </DialogHoliday>
    </>
  );
};
