import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src/components/index.js"),
      pages: path.resolve(__dirname, "src/pages/index.js"),
      constants: path.resolve(__dirname, "src/constants/index.js"),
      hooks: path.resolve(__dirname, "src/hooks/index.js"),
      store: path.resolve(__dirname, "src/store/index.js"),
      shared: path.resolve(__dirname, "src/shared/index.js"),
      utils: path.resolve(__dirname, "src/utils/index.js"),
      assets: path.resolve(__dirname, "src/assets/index.js"),
      client: path.resolve(__dirname, "src/client/index.js"),
      layouts: path.resolve(__dirname, "src/layouts/index.js"),
      config: path.resolve(__dirname, "src/config/index.js"),
      common: path.resolve(__dirname, "src/common/index.js"),
      lang: path.resolve(__dirname, "src/lang/index.js"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
