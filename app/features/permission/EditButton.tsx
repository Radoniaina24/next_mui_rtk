import Permission from "@/app/interface/permission";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useState } from "react";
import DialogPermission from "./dialog";
import AddFormPermission from "./form";
import BorderColorIcon from "@mui/icons-material/BorderColor";

export const EditButton = ({ row }: { row: Permission }) => {
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
      <DialogPermission {...{ open, onClose }}>
        <AddFormPermission
          permission={row as Permission}
          handleClose={onClose}
        />
      </DialogPermission>
    </>
  );
};
