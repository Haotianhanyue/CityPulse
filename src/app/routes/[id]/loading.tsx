import { Skeleton } from "@/components/ui/States";

/** 路线详情页加载骨架（SSR 取数期间的占位，消除跳转白屏） */
export default function Loading() {
  return (
    <div className="flex flex-col md:flex-row gap-xl px-margin-mobile md:px-margin-desktop py-lg pb-2xl">
      <div className="flex-1 min-w-0 space-y-lg">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
      <div className="hidden md:block w-80 flex-shrink-0 space-y-lg">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    </div>
  );
}
