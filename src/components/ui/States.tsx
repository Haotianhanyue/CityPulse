import { Icon } from "@/components/ui/Icon";

/** 骨架占位块 */
export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-surface-container-high ${className}`}
    />
  );
}

/** 列表骨架（n 个高度一致的卡片占位） */
export function CardSkeletons({
  count = 3,
  className = "h-40",
}: {
  count?: number;
  className?: string;
}) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className={className} />
      ))}
    </>
  );
}

/** 空状态 / 错误状态提示 */
export function EmptyState({
  icon = "inbox",
  title,
  description,
}: {
  icon?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-2xl text-center">
      <Icon name={icon} size={48} className="text-on-surface-variant mb-md" />
      <p className="text-body-lg font-body-lg text-on-surface">{title}</p>
      {description && (
        <p className="text-caption font-caption text-on-surface-variant mt-sm max-w-xs">
          {description}
        </p>
      )}
    </div>
  );
}
