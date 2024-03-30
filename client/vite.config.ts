import react from '@vitejs/plugin-react-swc'
import million from 'million/compiler'
import remarkMdx from 'remark-mdx'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
// https://vitejs.dev/config/
export default defineConfig(async () => {
  const mdx = await import('@mdx-js/rollup').then((m) => m.default)
  return {
    plugins: [
      mdx({
        remarkPlugins: [remarkMdx],
      }),
      react(),
      tsconfigPaths(),
      million.vite({
        auto: true,
      }),
    ],
  }
})
