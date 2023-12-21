import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"), // 设置@指向src
      "@components": resolve(__dirname, "src/components"), // 设置@components指向src/components
    },
  },
  server:{
    host:"127.0.0.1",//代理人地址
    open:true,//是否打开
    port: 80,// 重点，通过代理转发到5317,可以不配置
    proxy:{//代理信息（转发信息）
        // 这里的dev-api可乱写, 是拼接在url后面的地址 如果接口中没有统一的后缀可自定义
       // 如果有统一后缀, 如api, 直接写api即可, 也不用rewrite了
        ["^/api"]:{//暗号 一致会被拦截，不一致就不会被拦截
            target:'http://127.0.0.1:48080',//真实地址 表示要代理到哪里去（后端端口号）
            changeOrigin:true,//地址替换
            rewrite: (path) => path.replace(/^\/api/, ""),//消除作案痕迹 将api替换为空
        }
    }
  }
})
