import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/lib/theme";
import { SchluesselPage } from "@/pages/SchluesselPage";
import "@/index.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <SchluesselPage />
  </ThemeProvider>,
);
