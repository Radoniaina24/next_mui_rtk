import { useHolidayContext } from "@/lib/context/HolidayContext";
import { Box, FormControl, TextField, Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { FormHelperText } from "@mui/material";
import SubmitButtonHoliday from "./submitBtn";
import Holiday from "@/app/interface/holiday";
import { useFormik } from "formik";
import * as yup from "yup";
const initialValues: Omit<Holiday, "id"> = {
  name: "",
  date: dayjs(),
  dayType: 1,
};
export const holidaySchema = yup.object({
  name: yup.string().required("Ce champ est requis"),
  date: yup.string().required("Ce champ est requis"),
});

export default function AddFormHoliday({
  holiday,
  handleClose,
}: {
  holiday?: Holiday;
  handleClose?: any;
}) {
  const { id, handleUpdateHoliday, handleCreateHoliday } = useHolidayContext();
  async function onSubmit(values: any) {
    if (holiday?.id) {
      const dateString = dayjs(values.date).toDate().toLocaleDateString();
      const editHoliday = {
        ...values,
        dayType: parseInt(values.dayType),
        date: dateString,
      };
      await handleUpdateHoliday(editHoliday, holiday?.id);
      formik.resetForm();
      handleClose();
    } else {
      const dateString = dayjs(values.date).toDate().toLocaleDateString();
      console.log(dateString);
      const newHoliday = {
        ...values,
        dayType: parseInt(values.dayType),
        date: dateString,
      };
      await handleCreateHoliday(newHoliday);
      formik.resetForm();
      handleClose();
    }
  }
  const formik = useFormik({
    initialValues: holiday ? holiday : initialValues,
    validationSchema: holidaySchema,
    onSubmit,
  });

  const { values, handleChange, touched, errors, handleSubmit, setFieldValue } =
    formik;
  console.log(errors);
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
        {id ? "Modification du jours férié" : "Nouveau jours férié"}
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
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
        <FormControl fullWidth sx={{ marginY: "1rem" }}>
          <DatePicker
            name="date"
            label="Date"
            onChange={handleChange}
            value={dayjs(values.date, "DD/MM/YYYY")}
            onChange={(value) => setFieldValue("date", value, true)}
            format="DD/MM/YYYY"
          />

          {touched.date && Boolean(errors.date) ? (
            <FormHelperText error>{errors.date}</FormHelperText>
          ) : (
            <FormHelperText>Format DD/MM/YYYY</FormHelperText>
          )}
        </FormControl>
      </LocalizationProvider>

      <FormControl>
        {/* <FormLabel id="demo-row-radio-buttons-group-label">Jour</FormLabel> */}
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="dayType"
          value={values?.dayType ?? 0}
          onChange={(value) =>
            setFieldValue("dayType", value?.target?.value, true)
          }
        >
          <FormControlLabel
            value={0}
            control={<Radio />}
            label="Demi-journée"
            required
          />
          <FormControlLabel
            value={1}
            control={<Radio />}
            label="Toute la journée"
            required
          />
        </RadioGroup>
      </FormControl>

      <Box sx={{ display: "flex", justifyContent: "end", marginTop: "1rem" }}>
        <SubmitButtonHoliday />
      </Box>
    </form>
  );
}
