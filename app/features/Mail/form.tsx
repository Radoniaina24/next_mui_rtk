import { Box, FormHelperText, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SubmitButtonMail from "./submitBtn";
import { TagsInput } from "react-tag-input-component";
import Mail from "@/app/interface/mail";
import { useFormik } from "formik";
import { mailSchema } from "@/utils/yup/shema";
import { useMailContext } from "@/lib/context/MailContext";
const initialValues: Omit<Mail, "id"> = {
  name: "",
  cc: [],
  subject: "",
  body: "",
};

export default function AddFormMail({
  mail,
  handleClose,
}: {
  mail?: Mail;
  handleClose?: any;
}) {
  const [selected, setSelected] = useState<Array<string>>([]);
  const { id, handleUpdateMail, handleCreateMail } = useMailContext();
  async function onSubmit(values: any) {
    if (mail?.id) {
      const newCC = values.cc.join(",");
      const valuesEdit = { ...values, cc: newCC };
      await handleUpdateMail(valuesEdit, mail?.id);
      formik.resetForm();
      handleClose();
    } else {
      const newCC = values.cc.join(",");
      const newValues = { ...values, cc: newCC };
      await handleCreateMail(newValues);
      formik.resetForm();
      handleClose();
    }
  }
  const formik = useFormik({
    initialValues: mail ? mail : initialValues,
    validationSchema: mailSchema,
    onSubmit,
  });

  const { values, handleChange, touched, errors, handleSubmit, setFieldValue } =
    formik;
  useEffect(() => {
    if (mail) {
      const emails = mail?.cc?.split(",");
      setSelected(emails);
    }
  }, [mail]);
  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      style={{ marginTop: "25px" }}
    >
      <Typography
        sx={{ textAlign: "center", fontSize: "20px", marginY: "1rem" }}
      >
        {id ? "Modification du mail" : "Nouveau mail"}
      </Typography>
      <TextField
        label="Type de mail"
        margin="dense"
        fullWidth
        name="name"
        placeholder="Veuillez entrer le type de mail."
        value={values?.name || ""}
        onChange={handleChange}
        error={touched.name && Boolean(errors.name)}
        helperText={touched.name && errors.name}
      />

      <TextField
        label="Sujet"
        margin="dense"
        fullWidth
        name="subject"
        value={values?.subject || ""}
        onChange={handleChange}
        error={touched.subject && Boolean(errors.subject)}
        helperText={touched.subject && errors.subject}
        placeholder="Veuillez entrer le sujet."
      />
      <TextField
        label="Corps du mail"
        margin="dense"
        fullWidth
        name="body"
        value={values?.body || ""}
        onChange={handleChange}
        error={touched.body && Boolean(errors.body)}
        helperText={touched.body && errors.body}
        sx={{ marginBottom: ".8rem" }}
        placeholder="Veuillez renseigner le corps du message."
      />
      <TagsInput
        value={selected}
        onChange={(value) => setFieldValue("cc", value, true)}
        name="selected"
        placeHolder="Adresse email"
      />
      {touched.cc && Boolean(errors.cc) ? (
        <FormHelperText error sx={{ marginLeft: "14px" }}>
          {errors.cc}
        </FormHelperText>
      ) : (
        <FormHelperText sx={{ marginX: "14px" }}>
          Cliquez sur Entrée pour valider ou ajouter un nouvel email
        </FormHelperText>
      )}
      <Box sx={{ display: "flex", justifyContent: "end", marginTop: "1rem" }}>
        <SubmitButtonMail />
      </Box>
    </form>
  );
}
