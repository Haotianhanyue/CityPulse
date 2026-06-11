import path from "path";
import { defineConfig } from "@tarojs/cli";
import devConfig from "./dev";
import prodConfig from "./prod";

export default defineConfig(async (merge) => {
  const baseConfig = {
    projectName: "citypulse",
    date: "2026-6-11",
    designWidth: 750,
    deviceRatio: { 640: 2.34 / 2, 750: 1, 828: 1.81 / 2 },
    sourceRoot: "src",
    outputRoot: "dist",
    // 让 webpack 解析 @/ 别名（与 tsconfig paths 对齐）
    alias: {
      "@": path.resolve(__dirname, "..", "src"),
    },
    plugins: [],
    defineConstants: {},
    copy: { patterns: [], options: {} },
    framework: "react",
    compiler: "webpack5",
    cache: { enable: false },
    mini: {
      postcss: {
        pxtransform: { enable: true, config: {} },
        cssModules: { enable: false },
      },
    },
    h5: {
      publicPath: "/",
      staticDirectory: "static",
      esnextModules: ["@tarojs"],
      postcss: {
        autoprefixer: { enable: true },
        cssModules: { enable: false },
      },
    },
  };

  if (process.env.NODE_ENV === "development") {
    return merge({}, baseConfig, devConfig);
  }
  return merge({}, baseConfig, prodConfig);
});
