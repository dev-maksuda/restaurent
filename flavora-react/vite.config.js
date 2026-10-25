import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Simple Vite setup: one plugin, nothing else to think about.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
