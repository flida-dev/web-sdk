import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts(
    {
      entryRoot: resolve(__dirname, 'src'),
      rollupTypes: true,
      outputDir: 'dist',
      copyDtsFiles: false,
    }
  )],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index'
    },
  },
  define: {
    global: 'globalThis',
  },
});