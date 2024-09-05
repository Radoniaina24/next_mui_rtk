import Loading from "@/app/components/progress/loading";
import { useGetMailByIdQuery } from "@/lib/api/mailApi";
import { useMailContext } from "@/lib/context/MailContext";
import { Box, FormHelperText, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SubmitButtonMail from "./submitBtn";
import { TagsInput } from "react-tag-input-component";
export default function AddFormMail() {
  const { formik, id } = useMailContext();
  const [selected, setSelected] = useState([]);
  const { values, handleChange, touched, errors, handleSubmit, setFieldValue } =
    formik;
  const { data: mail, isLoading } = useGetMailByIdQuery(id);
  const mailEdit = mail?.data;
  useEffect(() => {
    if (!isLoading) {
      if (id) {
        const emails = mailEdit?.cc?.split(",");
        setSelected(emails);
        setFieldValue("name", mailEdit?.name);
        setFieldValue("cc", emails);
        setFieldValue("subject", mailEdit?.subject);
        setFieldValue("body", mailEdit?.body);
      }
    }
  }, [mail, id, isLoading]);
  if (id && isLoading) return <Loading />;
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
        margin="dense"
        fullWidth
        name="name"
        placeholder="Veuiller entrer le type de mail"
        value={values?.name || ""}
        onChange={handleChange}
        error={touched.name && Boolean(errors.name)}
        helperText={touched.name && errors.name}
      />

      <TextField
        margin="dense"
        fullWidth
        name="subject"
        value={values?.subject || ""}
        onChange={handleChange}
        error={touched.subject && Boolean(errors.subject)}
        helperText={touched.subject && errors.subject}
        placeholder="Veuiller entrer le sujet"
      />
      <TextField
        margin="dense"
        fullWidth
        name="body"
        value={values?.body || ""}
        onChange={handleChange}
        error={touched.body && Boolean(errors.body)}
        helperText={touched.body && errors.body}
        sx={{ marginBottom: ".8rem" }}
        placeholder="Veuiller saisir le corps de mail"
      />
      <TagsInput
        value={selected || ""}
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
