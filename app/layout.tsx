import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import SnackbarProvider from "@/lib/context/SnackbarContext";
import { ThemeProvider } from "@mui/material/styles";
import { baselightTheme } from "./theme/DefaultColors";
import CssBaseline from "@mui/material/CssBaseline";
interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <ThemeProvider theme={baselightTheme}>
            <AppRouterCacheProvider>
              <SnackbarProvider>
                <CssBaseline />
                {children}
              </SnackbarProvider>
            </AppRouterCacheProvider>
          </ThemeProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
