import * as yup from "yup";
import { string, number, array } from "yup";
export const holidaySchema = yup.object({
  name: string()
    .min(3, "La valeur doit être superieur de 3 caractères")
    .required("Champ obligatoire"),
  startDate: string().required("Champ obligatoire"),
  endDate: string().required("Champ obligatoire"),
});
export const permissionSchema = yup.object({
  event: string().required("Champ obligatoire"),
  dayCount: number("La valeur doit être un nombre superieur de 0")
    .moreThan(0, "La valeur doit être superieur de 1")
    .required("Champ obligatoire"),
  voucher: string().required("Champ obligatoire"),
});
export const otherSchema = yup.object({
  workDay: number()
    .moreThan(0, "La valeur doit être superieur de 0")
    .required("Champ obligatoire"),
  monthlyLeave: number()
    .moreThan(0, "La valeur doit être superieur de 0")
    .required("Champ obligatoire"),
  accruate: number()
    .moreThan(0, "La valeur doit être superieur de 0")
    .required("Champ obligatoire"),
  workHour: number("La valeur doit être un nombre superieur de 0")
    .moreThan(0, "La valeur doit être superieur de 0")
    .required("Champ obligatoire"),
  // dayOff: array().required("Champ obligatoire"),
});
