"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { Icon } from "@/components/ui/Icon";

/** 主题调色板：在 light/dark 之外提供完整配色方案切换（next-themes class 模式） */
const THEMES: { id: string; label: string; swatch: string; mood: string }[] = [
  { id: "light", label: "明亮", swatch: "#ab3500", mood: "默认暖橙" },
  { id: "dark", label: "暗夜", swatch: "#ffb59d", mood: "深灰护眼" },
  { id: "matcha", label: "茶园", swatch: "#3f7d4f", mood: "温润绿 · 文化漫步" },
  { id: "ink", label: "墨夜", swatch: "#ff6b35", mood: "荧光橙 · 夜骑专属" },
];

export function ThemePicker() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="mb-xl">
      <div className="flex items-center gap-sm mb-md">
        <Icon name="palette" size={20} className="text-primary" />
        <h2 className="font-headline-lg text-headline-md text-on-surface">
          界面主题
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
        {THEMES.map((t) => {
          const active = mounted && theme === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              aria-pressed={active}
              className={clsx(
                "flex items-center gap-sm p-md rounded-xl border text-left transition-all",
                active
                  ? "border-primary bg-primary-container/10 ring-2 ring-primary/30"
                  : "border-surface-variant bg-surface-container-low hover:bg-surface-container",
              )}
            >
              <span
                className="w-8 h-8 rounded-full flex-shrink-0 border border-surface-variant"
                style={{ backgroundColor: t.swatch }}
              />
              <span className="min-w-0">
                <span className="block text-label-md font-label-md text-on-surface">
                  {t.label}
                </span>
                <span className="block text-caption font-caption text-on-surface-variant truncate">
                  {t.mood}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
