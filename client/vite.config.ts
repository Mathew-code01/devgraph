/**
 * DevGraph — Vite Configuration
 */

import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    port: 5173,

    strictPort: true,
  },

  build: {
    sourcemap: true,

    target: "es2022",
  },
});
