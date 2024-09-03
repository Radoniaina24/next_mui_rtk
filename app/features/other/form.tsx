"use client";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import { useOtherContext } from "@/lib/context/OtherContext";
import SubmitButton from "@/app/components/button/submitBtn";
import { useGetOtherByIdQuery, useGetOtherQuery } from "@/lib/api/otherApi";
import { useEffect } from "react";

function AddFormOther() {
  const animatedComponents = makeAnimated();
  const options = [
    { value: 0, label: "Dimanche" },
    { value: 1, label: "Lundi" },
    { value: 2, label: "Mardi" },
    { value: 3, label: "Mercredi" },
    { value: 4, label: "Jeudi" },
    { value: 5, label: "Vendredi" },
    { value: 6, label: "Samedi" },
  ];
  const { formik, responseUpdateOther } = useOtherContext();
  const { values, handleChange, touched, errors, setFieldValue, handleSubmit } =
    formik;
  const changeValue = (e: any) => {
    const weeksValue = e.map((week: any) => week.value);
    setFieldValue("dayOff", weeksValue);
  };
  const { data: other, isLoading, error } = useGetOtherQuery("");
  useEffect(() => {
    if (other?.data[0]) {
      const values = other?.data[0];
      setFieldValue("accruate", values?.accruate);
      setFieldValue("coefficient", values?.coefficient);
      setFieldValue("isFormule", values?.isFormule);
      setFieldValue("monthlyLeave", values?.monthlyLeave);
      setFieldValue("workDay", values?.workDay);
      setFieldValue("workHour", values?.workHour);
    }
  }, [other?.data[0]]);
  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Box sx={{ marginTop: "1.5rem" }}>
        <TextField
          fullWidth
          margin="dense"
          name="workDay"
          label="Nombre de jours travail"
          value={values?.workDay || ""}
          onChange={handleChange}
          error={touched.workDay && Boolean(errors.workDay)}
          helperText={touched.workDay && errors.workDay}
          inputProps={{
            min: 1,
          }}
        />
        <TextField
          fullWidth
          margin="dense"
          name="workHour"
          label="Nombre d'heures de travail"
          value={values?.workHour || ""}
          onChange={handleChange}
          error={touched.workHour && Boolean(errors.workHour)}
          helperText={touched.workHour && errors.workHour}
          inputProps={{
            min: 1,
          }}
        />
        <TextField
          fullWidth
          margin="dense"
          name="monthlyLeave"
          label="Droit de congé mensuel"
          value={values?.monthlyLeave || ""}
          onChange={handleChange}
          error={touched.monthlyLeave && Boolean(errors.monthlyLeave)}
          helperText={touched.monthlyLeave && errors.monthlyLeave}
          inputProps={{
            min: 1,
          }}
        />
        <TextField
          fullWidth
          margin="dense"
          name="accruate"
          label="Accumulation Max"
          value={values?.accruate || ""}
          onChange={handleChange}
          error={touched.accruate && Boolean(errors.accruate)}
          helperText={touched.accruate && errors.accruate}
          inputProps={{
            min: 1,
          }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={values.isFormule}
              onChange={handleChange}
              name="isFormule"
            />
          }
          label="Utiliser le coefficient"
        />
        <TextField
          fullWidth
          margin="dense"
          name="coefficient"
          label="Coefficient"
          value={values?.coefficient || ""}
          onChange={handleChange}
          error={touched.coefficient && Boolean(errors.coefficient)}
          helperText={touched.coefficient && errors.coefficient}
          inputProps={{
            min: 1,
          }}
        />
        <Typography sx={{ marginLeft: "15px", marginBottom: "7px" }}>
          Jours de repos
        </Typography>
        <FormControl fullWidth>
          <Select
            id="dayOff"
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={options}
            name="dayOff"
            onChange={changeValue}
            required
          />
        </FormControl>
        {touched.dayOff && Boolean(errors.dayOff) ? (
          <FormHelperText error>{errors.dayOff}</FormHelperText>
        ) : (
          ""
        )}

        <Box sx={{ width: "100%", textAlign: "right", marginTop: "1.5rem" }}>
          <SubmitButton response={responseUpdateOther} />
        </Box>
      </Box>
    </form>
  );
}

export default AddFormOther;
