"use client";
import React from "react";
import * as yup from "yup";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import { SendEmail } from "@/utils/mail.utils";
interface Mail {
  name: string;
  email: string;
  message: string;
}
interface MailOption {
  from: string;
  to: string;
  subject: string;
  text: string;
}
const initialValues: Mail = {
  name: "",
  email: "",
  message: "",
};
const validationSchema = yup.object({
  name: yup.string().required("Nom requis"),
  email: yup
    .string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Entrer un adresse e-mail valide"
    )
    .required("Email requis"),
  phone: yup
    .string()
    .matches(
      /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i,
      "Entrer un numéro de téléphone valide"
    )
    .required("Numéro de téléphone requis"),
  message: yup
    .string()
    .min(5, "5 charactères minimum")
    .required("Message requis"),
});
const mailOptions: MailOption = {
  from: "andriambolaradoniainamichael@gmail.com",
  to: "andriambolaradoniainamichael@gmail.com",
  subject: "Email de test",
  text: "Ceci est un email de test envoyé avec Nodemailer et Next.js",
  phone: "0331193877",
};
export default function FormSendMail() {
  async function sendEmail({ name, email, message }: Mail) {
    const response = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    });
    console.log(await response.json());
  }
  const { values, handleChange, handleSubmit, touched, errors, resetForm } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit(values) {
        const { name, message, email } = values;
        sendEmail({ name, message, email });
      },
    });
  return (
    <Container maxWidth="sm" sx={{ marginTop: "6rem" }}>
      <form onSubmit={handleSubmit} autoComplete="off">
        <FormControl fullWidth margin={"dense"}>
          <TextField
            id="outlined-basic"
            label="Nom"
            variant="outlined"
            name={"name"}
            value={values.name}
            onChange={handleChange}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />
        </FormControl>
        <FormControl fullWidth margin={"dense"}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            name={"email"}
            value={values.email}
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
        </FormControl>
        <FormControl fullWidth margin={"dense"}>
          <TextField
            id="outlined-basic"
            label="Téléphone"
            variant="outlined"
            name={"phone"}
            value={values.phone}
            onChange={handleChange}
            error={touched.phone && Boolean(errors.phone)}
            helperText={touched.phone && errors.phone}
          />
        </FormControl>
        <FormControl fullWidth margin={"dense"}>
          <TextField
            multiline
            rows={4}
            id="outlined-basic"
            label="Message"
            variant="outlined"
            name={"message"}
            value={values.message}
            onChange={handleChange}
            error={touched.message && Boolean(errors.message)}
            helperText={touched.message && errors.message}
          />
        </FormControl>
        <Box
          sx={{
            marginY: "1rem",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Button
            color={"primary"}
            variant="contained"
            type="submit"
            size="large"
            sx={{ paddingX: "3rem" }}
          >
            Envoyer
          </Button>
        </Box>
      </form>
    </Container>
  );
}
