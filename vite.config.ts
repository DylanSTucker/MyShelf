import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePluginNode } from "vite-plugin-node";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
  },
  plugins:[
    react(),
    ...VitePluginNode({
      adapter: "express",
      appPath: "./src/server.ts",
      exportName: "MyShelf",
      tsCompiler: "esbuild",
      swcOptions: {},
    }),
  ],
});
