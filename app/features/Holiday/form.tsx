import { useGetHolidayByIdQuery } from "@/lib/api/holidayApi";
import { useHolidayContext } from "@/lib/context/HolidayContext";
import { Box, FormControl, TextField, Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { FormHelperText } from "@mui/material";
import Loading from "@/app/components/progress/loading";
import SubmitButtonHoliday from "./submitBtn";
export default function AddFormHoliday() {
  const { formik, responseAddHoliday, id } = useHolidayContext();
  const { values, handleChange, touched, errors, handleSubmit, setFieldValue } =
    formik;
  const { data: holiday, isLoading } = useGetHolidayByIdQuery(id);
  const holidayEdit = holiday?.data;

  useEffect(() => {
    if (id) {
      setFieldValue("name", holidayEdit?.name);
      setFieldValue("date", holidayEdit?.date);
      setFieldValue("dayPart", holidayEdit?.dayPart);
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
            name="date"
            label="Date"
            onChange={handleChange}
            value={dayjs(values.date) || ""}
            onChange={(value) => setFieldValue("date", value, true)}
          />
          {touched.startDate && Boolean(errors.startDate) ? (
            <FormHelperText error>{errors.startDate}</FormHelperText>
          ) : (
            ""
          )}
        </FormControl>
      </LocalizationProvider>

      <FormControl>
        {/* <FormLabel id="demo-row-radio-buttons-group-label">Jour</FormLabel> */}
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="dayPart"
          value={values?.dayPart || ""}
          onChange={(value) =>
            setFieldValue("dayPart", value?.target?.value, true)
          }
        >
          <FormControlLabel
            value="0"
            control={<Radio />}
            label="Demi-journée"
            required
          />
          <FormControlLabel
            value="1"
            control={<Radio />}
            label="Toute la journée"
            required
          />
        </RadioGroup>
        <FormHelperText>Vous devez choisir une option.</FormHelperText>
      </FormControl>

      <Box sx={{ display: "flex", justifyContent: "end", marginTop: "1rem" }}>
        <SubmitButtonHoliday />
      </Box>
    </form>
  );
}
