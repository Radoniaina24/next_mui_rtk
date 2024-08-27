import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import "./styles/globals.css";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
