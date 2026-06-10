"use client";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: string;
  className?: string;
  onClick?: () => void;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  className,
  onClick,
  fullWidth,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-sm rounded-lg font-label-md text-label-md transition-all active:scale-95";
  const variants = {
    primary:
      "bg-primary text-on-primary shadow-md hover:shadow-lg orange-glow",
    secondary: "bg-secondary text-on-secondary shadow-sm",
    ghost:
      "bg-transparent text-on-surface-variant hover:bg-surface-container-high",
  };
  const sizes = {
    sm: "px-sm py-1 text-caption",
    md: "px-md py-sm",
    lg: "px-lg py-md text-body-md",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={clsx(
        base,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      onClick={onClick}
    >
      {icon && (
        <span className="material-symbols-outlined text-[18px]">{icon}</span>
      )}
      {children}
    </motion.button>
  );
}
