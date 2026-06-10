"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

type NotificationPayload = {
  id: string;
  type: "comment" | "like" | "follow" | "system";
  title: string;
  message: string;
  createdAt: string;
};

interface SocketContextValue {
  connected: boolean;
  notifications: NotificationPayload[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  clearAll: () => void;
}

const SocketContext = createContext<SocketContextValue>({
  connected: false,
  notifications: [],
  unreadCount: 0,
  markAsRead: () => {},
  clearAll: () => {},
});

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false);
  const [notifications, setNotifications] = useState<NotificationPayload[]>([]);

  useEffect(() => {
    // Socket.IO 连接逻辑
    // 开发阶段: 模拟连接状态 + 模拟通知
    const timer = setTimeout(() => setConnected(true), 500);

    // 模拟初始通知
    setNotifications([
      {
        id: "n-001",
        type: "comment",
        title: "新评论",
        message: "城中小怪 评论了你的路线「徐汇周日漫步」",
        createdAt: "5分钟前",
      },
      {
        id: "n-002",
        type: "like",
        title: "获赞",
        message: "你的动态获得了 10 个新赞",
        createdAt: "1小时前",
      },
    ]);

    return () => clearTimeout(timer);
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearAll = useCallback(() => setNotifications([]), []);

  return (
    <SocketContext.Provider
      value={{
        connected,
        notifications,
        unreadCount: notifications.length,
        markAsRead,
        clearAll,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
