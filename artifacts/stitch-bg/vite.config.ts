import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const rawPort = process.env.PORT ?? "5173";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath =
  process.env.BASE_PATH ??
  (process.env.GITHUB_ACTIONS === "true" ? "/Notfall-Webpage/" : "/");

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
        schluessel: path.resolve(
          import.meta.dirname,
          "schluessel/index.html",
        ),
        rohr: path.resolve(import.meta.dirname, "rohr/index.html"),
        elektrik: path.resolve(import.meta.dirname, "elektrik/index.html"),
        heizung: path.resolve(import.meta.dirname, "heizung/index.html"),
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
