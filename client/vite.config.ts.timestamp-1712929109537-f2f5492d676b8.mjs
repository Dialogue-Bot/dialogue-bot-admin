// vite.config.ts
import react from "file:///E:/kltn/dialogue-bot/client/node_modules/@vitejs/plugin-react-swc/index.mjs";
import million from "file:///E:/kltn/dialogue-bot/client/node_modules/million/dist/packages/compiler.mjs";
import remarkMdx from "file:///E:/kltn/dialogue-bot/client/node_modules/remark-mdx/index.js";
import { defineConfig } from "file:///E:/kltn/dialogue-bot/client/node_modules/vite/dist/node/index.js";
import tsconfigPaths from "file:///E:/kltn/dialogue-bot/client/node_modules/vite-tsconfig-paths/dist/index.mjs";
var vite_config_default = defineConfig(async () => {
  const mdx = await import("file:///E:/kltn/dialogue-bot/client/node_modules/@mdx-js/rollup/index.js").then((m) => m.default);
  return {
    plugins: [
      mdx({
        remarkPlugins: [remarkMdx]
      }),
      react(),
      tsconfigPaths(),
      million.vite({
        auto: true
      })
    ]
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxrbHRuXFxcXGRpYWxvZ3VlLWJvdFxcXFxjbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXGtsdG5cXFxcZGlhbG9ndWUtYm90XFxcXGNsaWVudFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTova2x0bi9kaWFsb2d1ZS1ib3QvY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3YydcclxuaW1wb3J0IG1pbGxpb24gZnJvbSAnbWlsbGlvbi9jb21waWxlcidcclxuaW1wb3J0IHJlbWFya01keCBmcm9tICdyZW1hcmstbWR4J1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tICd2aXRlLXRzY29uZmlnLXBhdGhzJ1xyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IG1keCA9IGF3YWl0IGltcG9ydCgnQG1keC1qcy9yb2xsdXAnKS50aGVuKChtKSA9PiBtLmRlZmF1bHQpXHJcbiAgcmV0dXJuIHtcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgbWR4KHtcclxuICAgICAgICByZW1hcmtQbHVnaW5zOiBbcmVtYXJrTWR4XSxcclxuICAgICAgfSksXHJcbiAgICAgIHJlYWN0KCksXHJcbiAgICAgIHRzY29uZmlnUGF0aHMoKSxcclxuICAgICAgbWlsbGlvbi52aXRlKHtcclxuICAgICAgICBhdXRvOiB0cnVlLFxyXG4gICAgICB9KSxcclxuICAgIF0sXHJcbiAgfVxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJRLE9BQU8sV0FBVztBQUM3UixPQUFPLGFBQWE7QUFDcEIsT0FBTyxlQUFlO0FBQ3RCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sbUJBQW1CO0FBRTFCLElBQU8sc0JBQVEsYUFBYSxZQUFZO0FBQ3RDLFFBQU0sTUFBTSxNQUFNLE9BQU8sMEVBQWdCLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxPQUFPO0FBQ2hFLFNBQU87QUFBQSxJQUNMLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQSxRQUNGLGVBQWUsQ0FBQyxTQUFTO0FBQUEsTUFDM0IsQ0FBQztBQUFBLE1BQ0QsTUFBTTtBQUFBLE1BQ04sY0FBYztBQUFBLE1BQ2QsUUFBUSxLQUFLO0FBQUEsUUFDWCxNQUFNO0FBQUEsTUFDUixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
