/// <reference types="@tarojs/taro" />

declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.css";
declare module "*.scss";

declare const defineAppConfig: typeof import("@tarojs/taro").defineAppConfig;
declare const definePageConfig: typeof import("@tarojs/taro").definePageConfig;

declare namespace NodeJS {
  interface ProcessEnv {
    /** 当前构建平台 */
    TARO_ENV:
      | "weapp"
      | "swan"
      | "alipay"
      | "h5"
      | "rn"
      | "tt"
      | "quickapp"
      | "qq"
      | "jd";
    NODE_ENV: "development" | "production";
  }
}
