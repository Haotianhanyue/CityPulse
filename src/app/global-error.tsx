"use client";
import { useEffect } from "react";

/**
 * 根级错误边界：当根 layout 自身渲染失败时兜底。
 * 它会替换整个 <html>，因此不依赖全局 CSS / Tailwind，使用内联样式。
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="zh">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          background: "#f9f9f9",
          color: "#1a1c1c",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <div
          style={{
            fontSize: "48px",
            fontWeight: 700,
            color: "#ab3500",
            marginBottom: "8px",
          }}
        >
          CityPulse
        </div>
        <h1 style={{ fontSize: "20px", margin: "0 0 8px" }}>应用遇到了严重错误</h1>
        <p style={{ color: "#594139", maxWidth: "360px", margin: "0 0 24px" }}>
          很抱歉，发生了无法恢复的错误。请尝试重新加载。
        </p>
        <button
          onClick={() => reset()}
          style={{
            background: "#ab3500",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          重新加载
        </button>
      </body>
    </html>
  );
}
