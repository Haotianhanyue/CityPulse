"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!deferredPrompt || dismissed) return null;

  async function handleInstall() {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
    setDismissed(true);
  }

  return (
    <div className="fixed bottom-24 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:w-80 z-40 bg-surface rounded-xl shadow-xl border border-surface-variant p-md flex items-center gap-md">
      <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0">
        <Icon name="install_mobile" filled size={24} className="text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-label-md font-label-md text-on-surface">
          安装 CityPulse
        </p>
        <p className="text-caption font-caption text-on-surface-variant">
          添加到主屏幕，获得最佳体验
        </p>
      </div>
      <div className="flex gap-xs">
        <Button size="sm" onClick={handleInstall}>
          安装
        </Button>
        <button
          onClick={() => setDismissed(true)}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-high"
        >
          <Icon name="close" size={18} className="text-on-surface-variant" />
        </button>
      </div>
    </div>
  );
}
