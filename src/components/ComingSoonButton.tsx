"use client";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

/** 占位按钮：功能尚未上线时给出明确反馈，避免"点了没反应"的死交互 */
export function ComingSoonButton({
  icon,
  children,
  message,
  variant = "ghost",
  size = "sm",
}: {
  icon?: string;
  children: React.ReactNode;
  message: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}) {
  const { toast } = useToast();
  return (
    <Button
      icon={icon}
      variant={variant}
      size={size}
      onClick={() => toast(message, "info")}
    >
      {children}
    </Button>
  );
}
