import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      outDir: ['dist/types'], // 输出目录, 类型文件输出到哪个目录下
      include: 'src/core', // 需要编译的文件,那些ts文件需要生成类型文件
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/core/index.ts'), // 打包入口文件
      name: 'FineEmitter',
      fileName: 'fine-emitter', // 生成的文件名称
      formats: ['es', 'cjs', 'iife'],
    },
  },
})
