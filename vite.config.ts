import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  if (mode === 'lib') {
    return {
      plugins: [react()],
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'TldrawDAG',
          fileName: 'index',
          formats: ['es']
        },
        rollupOptions: {
          external: ['react', 'react-dom', 'tldraw'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
              tldraw: 'tldraw'
            }
          }
        }
      }
    }
  }
  
  return {
    plugins: [react()],
  }
})