/// <reference types="vite" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      provider: "istanbul", // or 'v8'
      exclude: ["src/App.tsx", "src/main.tsx", "dist", "src/Utils/formats.ts"],
    },
    environment: "jsdom",
  },
});
