import { PropsWithChildren } from "react";
import { useLaunch } from "@tarojs/taro";
import "./app.scss";

function App({ children }: PropsWithChildren) {
  useLaunch(() => {
    console.log("CityPulse 小程序启动");
  });

  // children 是将要渲染的页面
  return children;
}

export default App;
