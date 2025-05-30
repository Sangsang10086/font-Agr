import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

console.log('Vite 配置文件开始加载...');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))

    }
  },
  //配置代理
  server: {
    port: 5174,

    proxy: {
      '/api': {
        target: 'http://192.168.161.140', // 后端服务器地址
        changeOrigin: true, // 是否改变请求域名,本地会虚拟一个服务器接受请求并代你发送请求，这样就不会有跨域问题（只适合开发环境）
        // headers:{
        //   host: '192.168.161.134',
        //   origin:'http://192.168.161.134'
        // },
        rewrite: (path) => path.replace(/^\/api/, '')//将原有请求路径中的api替换为''

      },
      '/uploads': {
        target: 'http://localhost:3001/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/uploads/, '')
      }
    }
  }
})