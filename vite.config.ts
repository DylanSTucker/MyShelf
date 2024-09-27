import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePluginNode } from "vite-plugin-node";
import dotenv from 'dotenv';
//env path for ec2 instance
dotenv.config({ path: '/etc/app.env' });
//dotenv.config();



// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  return{
    server: {
      proxy:{
        '/api': 'https://localhost:8000',
      }
    },
    plugins:[
      react()
    ],
    define: {
      "process.env": process.env
    },
  }
});
