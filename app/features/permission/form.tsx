import SubmitButton from "@/app/components/button/submitBtn";
import Loading from "@/app/components/progress/loading";
import { useGetPermissionByIdQuery } from "@/lib/api/permissionApi";
import { usePermissionContext } from "@/lib/context/PermissionContext";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";

export default function AddFormPermission() {
  const { formik, responseAddPermission, id } = usePermissionContext();
  const { values, handleChange, touched, errors, handleSubmit, setFieldValue } =
    formik;
  const { data: permission, isLoading } = useGetPermissionByIdQuery(id);
  const permissionEdit = permission?.data;
  useEffect(() => {
    if (id) {
      setFieldValue("event", permissionEdit?.event);
      setFieldValue("dayCount", permissionEdit?.dayCount);
      setFieldValue("voucher", permissionEdit?.voucher);
    }
  }, [permission, id]);

  if (id && isLoading) return <Loading />;
  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      style={{ marginTop: "25px" }}
    >
      <Typography
        sx={{ textAlign: "center", fontSize: "20px", marginY: "0.2rem" }}
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
        <SubmitButton response={responseAddPermission} />
      </Box>
    </form>
  );
}
