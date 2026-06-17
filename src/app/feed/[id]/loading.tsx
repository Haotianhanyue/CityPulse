import { Skeleton } from "@/components/ui/States";

/** 动态详情页加载骨架（SSR 取数期间的占位） */
export default function Loading() {
  return (
    <div className="max-w-2xl mx-auto px-margin-mobile md:px-margin-desktop py-lg pb-2xl space-y-lg">
      <Skeleton className="h-6 w-24" />
      <Skeleton className="h-10 w-3/4" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-72 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  );
}
