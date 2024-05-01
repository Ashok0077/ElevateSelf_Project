import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        // target: "https://elevate-self-api.vercel.app",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
