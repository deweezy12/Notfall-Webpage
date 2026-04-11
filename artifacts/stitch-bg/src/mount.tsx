import type { ReactElement } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/lib/theme";
import "@/styles.css";

export function mountPage(page: ReactElement) {
  createRoot(document.getElementById("root")!).render(
    <ThemeProvider>{page}</ThemeProvider>,
  );
}
