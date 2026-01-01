import { defineConfig } from "vite";

export default defineConfig({
  base: "/portofolio/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
  },
});
