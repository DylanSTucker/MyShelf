import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePluginNode } from "vite-plugin-node";



// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  return{
    server: {
      port: 8080,
    },
    plugins:[
      react()
    ],
    define: {
      "process.env": {},
    },
  }
});
