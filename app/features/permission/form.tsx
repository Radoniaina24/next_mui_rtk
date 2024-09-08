import { usePermissionContext } from "@/lib/context/PermissionContext";
import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import SubmitButtonPermission from "./submitBtn";
import Permission from "@/app/interface/permission";

import { useFormik } from "formik";
import { permissionSchema } from "@/utils/yup/shema";
const initialValues: Omit<Permission, "id"> = {
  event: "",
  dayCount: 1,
  voucher: "",
};
export default function AddFormPermission({
  permission,
  handleClose,
}: {
  permission?: Permission;
  handleClose?: any;
}) {
  const { id, handleUpdatePermission, handleCreatePermission } =
    usePermissionContext();
  async function onSubmit(values: any) {
    if (permission?.id) {
      await handleUpdatePermission(values, permission?.id);
      formik.resetForm();
      handleClose();
    } else {
      await handleCreatePermission(values);
      formik.resetForm();
      handleClose();
    }
  }
  const formik = useFormik({
    initialValues: permission ? permission : initialValues,
    validationSchema: permissionSchema,
    onSubmit,
  });

  const { values, handleChange, touched, errors, handleSubmit, setFieldValue } =
    formik;

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      style={{ marginTop: "25px" }}
    >
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "20px",
          marginY: "0.2rem",
          marginBottom: "1rem",
        }}
      >
        {id ? "Modification du permission" : "Nouveau permission"}
      </Typography>
      <TextField
        margin="dense"
        fullWidth
        name="event"
        label="Evenement"
        value={values?.event || ""}
        onChange={handleChange}
        error={touched.event && Boolean(errors.event)}
        helperText={touched.event && errors.event}
      />
      <TextField
        margin="dense"
        fullWidth
        name="voucher"
        label="Pièce justificative"
        value={values?.voucher || ""}
        onChange={handleChange}
        error={touched.voucher && Boolean(errors.voucher)}
        helperText={touched.voucher && errors.voucher}
      />
      <TextField
        margin="dense"
        fullWidth
        type="number"
        name="dayCount"
        label="Nombre de jour"
        value={values?.dayCount || ""}
        onChange={handleChange}
        error={touched.dayCount && Boolean(errors.dayCount)}
        helperText={touched.dayCount && errors.dayCount}
        inputProps={{
          min: 1,
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "end", marginTop: "1rem" }}>
        <SubmitButtonPermission />
      </Box>
    </form>
  );
}
