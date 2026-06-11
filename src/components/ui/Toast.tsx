"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";

type ToastType = "success" | "error" | "info";
interface ToastItem {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

/** 在任意客户端组件中调用 `const { toast } = useToast()` 弹出轻提示 */
export function useToast() {
  return useContext(ToastContext);
}

const ICON: Record<ToastType, string> = {
  success: "check_circle",
  error: "error",
  info: "info",
};

const ACCENT: Record<ToastType, string> = {
  success: "text-green-500",
  error: "text-error",
  info: "text-secondary",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const toast = useCallback((message: string, type: ToastType = "info") => {
    const id = Date.now() + Math.random();
    setItems((prev) => [...prev, { id, type, message }]);
    setTimeout(
      () => setItems((prev) => prev.filter((t) => t.id !== id)),
      2600,
    );
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed left-1/2 -translate-x-1/2 bottom-28 md:bottom-8 z-[100] flex flex-col items-center gap-sm pointer-events-none">
        <AnimatePresence>
          {items.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-sm bg-inverse-surface text-inverse-on-surface px-md py-sm rounded-full shadow-xl text-label-md font-label-md"
            >
              <Icon name={ICON[t.type]} filled size={18} className={ACCENT[t.type]} />
              {t.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
