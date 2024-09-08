import { Suspense, type ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import SnackbarProvider from "@/lib/context/SnackbarContext";
import { ThemeProvider } from "@mui/material/styles";
import { baselightTheme } from "./theme/DefaultColors";
import CssBaseline from "@mui/material/CssBaseline";
import { Metadata } from "next";
import Loading from "./loading";
interface Props {
  readonly children: ReactNode;
}
export const metadata: Metadata = {
  title: {
    absolute: "",
    default: "Time off",
    template: "%s | Time off",
  },
  description: "...",
};
export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <ThemeProvider theme={baselightTheme}>
            <AppRouterCacheProvider>
              <SnackbarProvider>
                <Suspense fallback={<Loading />}>
                  <CssBaseline />
                  {children}
                </Suspense>
              </SnackbarProvider>
            </AppRouterCacheProvider>
          </ThemeProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
