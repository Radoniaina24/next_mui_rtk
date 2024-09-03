import { AlertProps } from "@mui/material";
export default interface SnackbarContextType {
  showSnackbar: (message: string, severity?: AlertProps["severity"]) => void;
}
