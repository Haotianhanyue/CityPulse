"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-10 h-10" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-high transition-colors"
      aria-label="切换主题"
    >
      <Icon
        name={theme === "dark" ? "light_mode" : "dark_mode"}
        size={22}
        className="text-on-surface-variant"
      />
    </button>
  );
}
