import * as yup from "yup";
import { string, number, array } from "yup";
// yup Holiday
export const holidaySchema = yup.object({
  name: string()
    .min(3, "La valeur doit être superieur de 3 caractères")
    .required("Ce champ est requis"),
  startDate: string().required("Ce champ est requis"),
  endDate: string().required("Ce champ est requis"),
});
// yup Permission
export const permissionSchema = yup.object({
  event: string().required("Ce champ est requis"),
  dayCount: number("La valeur doit être un nombre superieur de 0")
    .moreThan(0, "La valeur doit être superieur de 1")
    .required("Ce champ est requis"),
  voucher: string().required("Ce champ est requis"),
});

// yup mail

export const mailSchema = yup.object({
  name: string().required("Ce champ est requis"),
  cc: array()
    .of(
      string()
        .email("Veuillez entrer une adresse e-mail valide")
        .required("L'adresse e-mail est obligatoire")
    )
    .min(1, "Veuillez entrer au moins une adresse e-mail"),
  subject: string().required("Ce champ est requis"),
  body: string().required("Ce champ est requis"),
});

const parseStringToNumber = (value) => {
  if (typeof value !== "string") return value;
  return parseFloat(value.replace(",", "."));
};

// yup Other
export const otherSchema = yup.object({
  workDay: string()
    .matches(
      /^[0-9]*[,]?[0-9]*$/,
      "Veuillez entrer un nombre valide avec une virgule."
    )
    .required("Ce champ est requis")
    .test("is-valid-number", "Veuillez entrer un nombre valide.", (value) => {
      const parsedValue = parseStringToNumber(value);
      return !isNaN(parsedValue);
    })
    .test(
      "min",
      "Le nombre de jour doit être supérieur ou égal à 1 jour.",
      (value) => {
        const parsedValue = parseStringToNumber(value);
        return parsedValue >= 1;
      }
    )
    .test(
      "max",
      "Le nombre de jour doit être inférieur ou égal à 7 jours.",
      (value) => {
        const parsedValue = parseStringToNumber(value);
        return parsedValue <= 7;
      }
    ),

  monthlyLeave: string()
    .matches(
      /^[0-9]*[,]?[0-9]*$/,
      "Veuillez entrer un nombre valide avec une virgule."
    )
    .required("Ce champ est requis")
    .test("is-valid-number", "Veuillez entrer un nombre valide.", (value) => {
      const parsedValue = parseStringToNumber(value);
      return !isNaN(parsedValue);
    })
    .test(
      "min",
      "Droit de congé mensuel doit être supérieur ou égal à 1 jour.",
      (value) => {
        const parsedValue = parseStringToNumber(value);
        return parsedValue >= 1;
      }
    )
    .test(
      "max",
      "Droit de congé mensuel doit être inférieur ou égal à 31 jours.",
      (value) => {
        const parsedValue = parseStringToNumber(value);
        return parsedValue <= 31;
      }
    ),

  accruate: string()
    .matches(/^[0-9]*[,]?[0-9]*$/, "Veuillez entrer un nombre valide .")
    .required("Ce champ est requis")
    .test("is-valid-number", "Veuillez entrer un nombre valide.", (value) => {
      const parsedValue = parseStringToNumber(value);
      return !isNaN(parsedValue);
    })
    .test("min", "Accumulation doit être supérieur ou égal à .", (value) => {
      const parsedValue = parseStringToNumber(value);
      return parsedValue >= 0;
    }),
  workHour: string()
    .matches(
      /^[0-9]*[,]?[0-9]*$/,
      "Veuillez entrer un nombre valide avec une virgule."
    )
    .required("Ce champ est requis")
    .test("is-valid-number", "Veuillez entrer un nombre valide.", (value) => {
      const parsedValue = parseStringToNumber(value);
      return !isNaN(parsedValue);
    })
    .test(
      "min",
      "Le nombre d'heure de travail doit être supérieur ou égal à 0.",
      (value) => {
        const parsedValue = parseStringToNumber(value);
        return parsedValue >= 0;
      }
    )
    .test(
      "max",
      "Le nombre d'heure de travail doit inferieur ou égal à 24.",
      (value) => {
        const parsedValue = parseStringToNumber(value);
        return parsedValue <= 24;
      }
    ),

  coefficient: string()
    .matches(/^[0-9]*[,]?[0-9]*$/, "Veuillez entrer un nombre valide.")
    .required("Ce champ est requis"),
  dayOff: array().required("Ce champ est requis"),
});
