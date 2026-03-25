import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

/* Vite 配置文档：https://vite.dev/config/ */
export default defineConfig({
  /* 注册 Vue 核心插件与开发调试插件。 */

  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      /* 使用 `@` 指向 `src`，简化模块导入路径。 */

      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
