import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const rawPort = process.env.PORT ?? "5173";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base: basePath,
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(import.meta.dirname, "index.html"),
        schluessel: path.resolve(import.meta.dirname, "schluessel/index.html"),
        rohr: path.resolve(import.meta.dirname, "rohr/index.html"),
        elektrik: path.resolve(import.meta.dirname, "elektrik/index.html"),
        heizung: path.resolve(import.meta.dirname, "heizung/index.html"),
        nagelstudio: path.resolve(
          import.meta.dirname,
          "nagelstudio/index.html",
        ),
        physiotherapie: path.resolve(
          import.meta.dirname,
          "physiotherapie/index.html",
        ),
        soundfield: path.resolve(import.meta.dirname, "soundfield/index.html"),
        wanzleben: path.resolve(import.meta.dirname, "wanzleben/index.html"),
        annkafalk: path.resolve(import.meta.dirname, "annkafalk/index.html"),
        impressum: path.resolve(import.meta.dirname, "impressum/index.html"),
        datenschutz: path.resolve(
          import.meta.dirname,
          "datenschutz/index.html",
        ),
      },
    },
  },
  server: {
    port,
    host: "0.0.0.0",
  },
  preview: {
    port,
    host: "0.0.0.0",
  },
});
