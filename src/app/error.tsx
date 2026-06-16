"use client";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/** 路由级错误边界：服务端/客户端渲染出错时的品牌化兜底 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-margin-mobile text-center">
      <Icon name="sentiment_dissatisfied" size={56} className="text-primary mb-md" />
      <h1 className="font-headline-lg text-headline-md text-on-surface mb-sm">
        出了点小状况
      </h1>
      <p className="text-body-md font-body-md text-on-surface-variant mb-lg max-w-sm">
        页面加载时发生了错误。你可以重试，或先回到首页继续探索。
      </p>
      <div className="flex items-center gap-md">
        <Button icon="refresh" onClick={() => reset()}>
          重试
        </Button>
        <Link href="/">
          <Button variant="ghost" icon="home">
            回到首页
          </Button>
        </Link>
      </div>
    </div>
  );
}
