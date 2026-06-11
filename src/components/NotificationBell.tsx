"use client";
import { useState } from "react";
import { useSocket } from "@/components/SocketProvider";
import { Icon } from "@/components/ui/Icon";
import { useToast } from "@/components/ui/Toast";
import { subscribeToPush, pushResultMessage } from "@/lib/push";

export function NotificationBell() {
  const { notifications, unreadCount, markAsRead, clearAll } = useSocket();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const enablePush = async () => {
    const result = await subscribeToPush();
    toast(pushResultMessage(result), result === "subscribed" ? "success" : "info");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-high transition-colors relative"
      >
        <Icon name="notifications" size={22} className="text-on-surface-variant" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-primary text-white text-[10px] font-label-md flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-12 w-80 bg-surface rounded-xl shadow-xl border border-surface-variant z-50 overflow-hidden">
            <div className="flex items-center justify-between px-md py-sm border-b border-surface-variant">
              <span className="text-label-md font-label-md">通知</span>
              <div className="flex items-center gap-md">
                <button
                  onClick={enablePush}
                  className="flex items-center gap-xs text-caption font-caption text-secondary hover:underline"
                >
                  <Icon name="notifications_active" size={14} />
                  开启推送
                </button>
                <button
                  onClick={clearAll}
                  className="text-caption font-caption text-primary hover:underline"
                >
                  全部已读
                </button>
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-lg text-center text-caption font-caption text-on-surface-variant">
                  暂无新通知
                </div>
              ) : (
                notifications.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => markAsRead(n.id)}
                    className="w-full text-left px-md py-sm hover:bg-surface-container-high transition-colors border-b border-surface-variant last:border-0"
                  >
                    <div className="flex items-start gap-sm">
                      <Icon
                        name={
                          n.type === "comment"
                            ? "mode_comment"
                            : n.type === "like"
                              ? "favorite"
                              : n.type === "follow"
                                ? "person_add"
                                : "info"
                        }
                        size={18}
                        className="text-primary mt-0.5"
                      />
                      <div className="min-w-0">
                        <p className="text-label-md font-label-md text-on-surface">
                          {n.title}
                        </p>
                        <p className="text-caption font-caption text-on-surface-variant truncate">
                          {n.message}
                        </p>
                        <p className="text-caption font-caption text-on-surface-variant mt-xs">
                          {n.createdAt}
                        </p>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
