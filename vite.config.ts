import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [TanStackRouterVite({ autoCodeSplitting: true }), tailwindcss(), react()],
  resolve: {
    tsconfigPaths: true,
    alias: { "@": `${process.cwd()}/src` },
  },
});
