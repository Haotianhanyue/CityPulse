"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { Icon } from "@/components/ui/Icon";

const navItems = [
  { id: "explore" as const, icon: "map", label: "发现", href: "/" },
  { id: "routes" as const, icon: "route", label: "路线", href: "/routes" },
  { id: "feed" as const, icon: "forum", label: "社区", href: "/community" },
  { id: "profile" as const, icon: "account_circle", label: "个人中心", href: "/profile" },
] as const;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-surface border-r border-surface-variant fixed top-0 left-0 h-full">
      {/* Brand */}
      <div className="px-lg py-xl flex items-center gap-sm">
        <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center">
          <Icon name="place" filled size={24} className="text-primary" />
        </div>
        <span className="font-headline-lg text-headline-md text-primary">
          CityPulse
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-md space-y-xs">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.id}
              href={item.href}
              className={clsx(
                "flex items-center gap-md px-md py-3 rounded-full transition-colors",
                isActive
                  ? "bg-secondary-container text-on-secondary-container"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              )}
            >
              <Icon name={item.icon} filled={isActive} size={24} />
              <span className="font-label-md text-label-md">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-lg py-md text-caption font-caption text-on-surface-variant">
        CityPulse · 发现城市中的隐藏宝藏
      </div>
    </aside>
  );
}
