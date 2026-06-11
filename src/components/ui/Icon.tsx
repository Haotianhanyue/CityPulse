import Image from "next/image";
import { clsx } from "clsx";

interface IconProps {
  name: string;
  filled?: boolean;
  size?: number;
  className?: string;
}

export function Icon({
  name,
  filled,
  size = 24,
  className,
}: IconProps) {
  return (
    <span
      className={clsx("material-symbols-outlined", className)}
      style={{
        fontSize: `${size}px`,
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' ${size}`,
      }}
    >
      {name}
    </span>
  );
}

interface AvatarProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  bordered?: boolean;
}

export function Avatar({
  src,
  alt,
  size = "md",
  bordered,
}: AvatarProps) {
  const sizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
    xl: "w-20 h-20",
  };
  const px = { sm: 24, md: 32, lg: 40, xl: 80 }[size];

  return (
    <Image
      src={src}
      alt={alt}
      width={px}
      height={px}
      className={clsx(
        "rounded-full object-cover",
        sizes[size],
        bordered && "border-2 border-primary-container"
      )}
    />
  );
}
