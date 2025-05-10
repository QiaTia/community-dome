import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
// import Replace from "./component-replace";
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default function ({ mode }) {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    plugins: [
      vue(),
      Components({ resolvers: [VantResolver()] }),
      viteCompression({
        ext: '.gz',
        deleteOriginFile: false,
      }),
    ],
    resolve: {
      // 配置路径别名
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          /** 全局混入 */
          additionalData: `@import "./src/styles/variables.scss";`,
        },
      },
    },
    server: {
      host: true,
      port: +env.VITE_PORT,
      proxy: {
        '/api/': {
          target: env.VITE_PROXY_URL,
          changeOrigin: true,
        },
      },
    },
  });
}
