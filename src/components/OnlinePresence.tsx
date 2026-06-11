"use client";
import { useSocket } from "@/components/SocketProvider";

/** 实时在线人数指示（连接中显示脉冲绿点） */
export function OnlinePresence() {
  const { connected, onlineCount } = useSocket();

  return (
    <div className="inline-flex items-center gap-xs px-sm py-1 rounded-full bg-surface-container-high text-caption font-caption text-on-surface-variant">
      <span className="relative flex h-2 w-2">
        {connected && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            connected ? "bg-green-500" : "bg-surface-dim"
          }`}
        />
      </span>
      {connected ? `${onlineCount.toLocaleString("zh-CN")} 人在线` : "连接中..."}
    </div>
  );
}
