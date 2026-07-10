import { defineConfig } from "vite";
import react      from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    port: 5173,
    // Dev proxy: /api requests are forwarded to the Express server.
    // This eliminates CORS issues during local development.
    proxy: {
      "/api": {
        target:      "http://localhost:5000",
        changeOrigin: true,
        secure:       false,
      },
    },
  },
});
