import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
// @ts-ignore
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

const resolve_path = (dir) => path.join(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {

  return ({
    base: '/', // => publicPath
    plugins: [
      vue(),
      viteCompression(
        {
          filter: /\.js$|\.html$|\.css$|\.svg$/,
          threshold: 1024000 * 0.2
        }
      ),
      visualizer(),

    ],
    build: {
      minify: 'terser',
      assetsInlineLimit: 100,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        keep_classnames: true
      },
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/variable.scss";'
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve_path('src')
      }
    },
    define: {
      __APP_VERSION__: JSON.stringify('1.1.1') // 必须使用 JSON.stringify
    },
    server: {
      host: '0.0.0.0',
      port: 5321,
      proxy: {
        '/biyi': {
          target: process.env.VUE_APP_BASE_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/biyi/, '')
        }
      }
    }
  });
});
