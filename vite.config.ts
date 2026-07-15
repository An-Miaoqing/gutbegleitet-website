import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, ".", "VITE_");

  if (command === "build" && !env.VITE_API_URL?.trim()) {
    throw new Error(
      "VITE_API_URL is required for production builds. Set it to the CareOS backend origin.",
    );
  }

  return {
    plugins: [react(), tailwindcss()],
  };
});
