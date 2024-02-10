import { defineConfig } from 'vite'
import path from "path";
import react from '@vitejs/plugin-react-swc'
import generouted from '@generouted/react-router/plugin'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react(), generouted()],
})
