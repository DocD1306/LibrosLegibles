/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss()
  ],
  test: {
    // Aquí puedes añadir configuración para tests unitarios normales si los usas
    environment: 'jsdom', 
    globals: true,
  }
});