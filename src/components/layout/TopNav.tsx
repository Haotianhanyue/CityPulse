"use client";
import { Icon } from "@/components/ui/Icon";
import { Avatar } from "@/components/ui/Icon";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NotificationBell } from "@/components/NotificationBell";
import { useAppStore } from "@/store/useAppStore";
import { clsx } from "clsx";

export function TopNav() {
  const fabMenuOpen = useAppStore((s) => s.fabMenuOpen);
  const toggleFabMenu = useAppStore((s) => s.toggleFabMenu);
  const closeFabMenu = useAppStore((s) => s.closeFabMenu);

  return (
    <>
      <header className="flex items-center justify-between px-margin-mobile md:px-margin-desktop py-md bg-surface shadow-sm relative z-50">
        <span className="font-headline-lg text-body-lg text-primary">
          CityPulse
        </span>

        <nav className="hidden md:flex items-center gap-lg">
          <a href="/" className="text-body-md hover:text-primary">发现</a>
          <a href="/routes" className="text-body-md hover:text-primary">路线</a>
          <a href="/community" className="text-body-md hover:text-primary">社区</a>
        </nav>

        <div className="flex items-center gap-sm">
          <ThemeToggle />
          <NotificationBell />
          <Icon name="location_on" size={24} className="text-on-surface-variant cursor-pointer" />
          <Avatar src="/avatars/user1.jpg" alt="用户" size="md" bordered />
        </div>

        {/* FAB */}
        <div className="relative">
          <button
            onClick={toggleFabMenu}
            className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-50 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
          >
            <Icon
              name="add"
              size={28}
              className={clsx(
                "transition-transform duration-300",
                fabMenuOpen && "rotate-45"
              )}
            />
          </button>

          {fabMenuOpen && (
            <>
              <div
                onClick={closeFabMenu}
                className="fixed inset-0 bg-black/20 z-40"
              />
              <div className="fixed bottom-44 right-4 md:bottom-24 md:right-6 z-50 flex flex-col gap-sm">
                <div className="flex items-center gap-sm justify-end">
                  <span className="text-caption font-caption bg-black/60 text-white px-sm py-1 rounded-full">
                    拍摄照片
                  </span>
                  <button
                    onClick={closeFabMenu}
                    className="w-12 h-12 bg-surface rounded-full flex items-center justify-center shadow-md"
                  >
                    <Icon name="photo_camera" filled size={24} className="text-primary" />
                  </button>
                </div>
                <div className="flex items-center gap-sm justify-end">
                  <span className="text-caption font-caption bg-black/60 text-white px-sm py-1 rounded-full">
                    撰写动态
                  </span>
                  <button
                    onClick={closeFabMenu}
                    className="w-12 h-12 bg-surface rounded-full flex items-center justify-center shadow-md"
                  >
                    <Icon name="edit_square" filled size={24} className="text-secondary" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </header>
    </>
  );
}
