import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { execSync } from 'node:child_process';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().getTime()),
    __GIT_HASH__: JSON.stringify(
      execSync("git rev-parse --short HEAD").toString().trim()
    ),
  },
})
