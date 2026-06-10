"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { Icon } from "@/components/ui/Icon";

const navItems = [
  { id: "explore" as const, icon: "map", label: "地图", href: "/" },
  { id: "feed" as const, icon: "forum", label: "动态", href: "/community" },
  { id: "routes" as const, icon: "route", label: "路线", href: "/routes" },
  { id: "profile" as const, icon: "account_circle", label: "我的", href: "/profile" },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-margin-mobile py-sm md:hidden bg-surface shadow-lg rounded-t-xl">
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
              "flex flex-col items-center justify-center transition-colors",
              isActive
                ? "bg-primary-container text-on-primary-container rounded-full px-4 py-1 scale-95"
                : "text-on-surface-variant hover:text-primary"
            )}
          >
            <Icon name={item.icon} filled={isActive} size={24} />
            <span className="text-caption font-caption">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
