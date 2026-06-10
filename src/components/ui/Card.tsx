"use client";
import { clsx } from "clsx";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hoverable, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "bg-surface rounded-xl shadow-sm border border-surface-variant overflow-hidden",
        hoverable &&
          "group cursor-pointer hover:bg-surface-container-low transition-colors",
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardImageProps {
  src: string;
  alt: string;
  height?: string;
}

export function CardImage({
  src,
  alt,
  height = "h-48",
}: CardImageProps) {
  return (
    <div className={clsx("w-full overflow-hidden", height)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
  );
}
