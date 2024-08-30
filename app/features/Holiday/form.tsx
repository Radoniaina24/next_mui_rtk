import { useGetHolidayByIdQuery } from "@/lib/api/holidayApi";
import { useHolidayContext } from "@/lib/context/HolidayContext";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { FormHelperText } from "@mui/material";
import SubmitButton from "@/app/components/button/submitBtn";
import Loading from "@/app/components/progress/loading";
export default function AddFormHoliday() {
  const { formik, responseAddHoliday, id } = useHolidayContext();
  const { values, handleChange, touched, errors, handleSubmit, setFieldValue } =
    formik;
  const { data: holiday, isLoading } = useGetHolidayByIdQuery(id);
  const holidayEdit = holiday?.data;
  useEffect(() => {
    if (id) {
      setFieldValue("name", holidayEdit?.name);
      setFieldValue("startDate", holidayEdit?.startDate);
      setFieldValue("endDate", holidayEdit?.endDate);
    }
  }, [holiday, id]);

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
        {id ? "Modification du jour férié" : "Nouveau jour férié"}
      </Typography>
      <TextField
        margin="dense"
        fullWidth
        name="name"
        label="Evenement"
        value={values?.name || ""}
        onChange={handleChange}
        error={touched.name && Boolean(errors.name)}
        helperText={touched.name && errors.name}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormControl fullWidth sx={{ marginY: "1rem" }}>
          <DatePicker
            name="startDate"
            label="Date de début"
            onChange={handleChange}
            value={dayjs(values.startDate) || ""}
            onChange={(value) => setFieldValue("startDate", value, true)}
          />
          {touched.startDate && Boolean(errors.startDate) ? (
            <FormHelperText error>{errors.startDate}</FormHelperText>
          ) : (
            ""
          )}
        </FormControl>
        <FormControl fullWidth>
          <DatePicker
            name="endDate"
            label="Date de fin"
            onChange={handleChange}
            value={dayjs(values.endDate) || ""}
            onChange={(value) => setFieldValue("endDate", value, true)}
          />
          {touched.endDate && Boolean(errors.endDate) ? (
            <FormHelperText error>{errors.endDate}</FormHelperText>
          ) : (
            ""
          )}
        </FormControl>
      </LocalizationProvider>

      <Box sx={{ display: "flex", justifyContent: "end", marginTop: "1rem" }}>
        <SubmitButton response={responseAddHoliday} />
      </Box>
    </form>
  );
}
