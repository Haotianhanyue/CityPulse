// Taro 默认 babel 配置（React + TS）
module.exports = {
  presets: [
    [
      "taro",
      {
        framework: "react",
        ts: true,
        compiler: "webpack5",
        useBuiltIns: process.env.TARO_ENV === "h5" ? "usage" : false,
      },
    ],
  ],
};
