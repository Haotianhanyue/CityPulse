"use client";
import Image from "next/image";
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
    <div className={clsx("relative w-full overflow-hidden", height)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
  );
}
