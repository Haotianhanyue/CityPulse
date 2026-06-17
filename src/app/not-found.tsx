import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/** 全局 404：notFound() 触发或访问不存在路由时的品牌化页面 */
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-margin-mobile text-center">
      <Icon name="explore_off" size={56} className="text-primary mb-md" />
      <h1 className="font-headline-lg text-display-lg text-on-surface mb-sm">
        404
      </h1>
      <p className="text-body-md font-body-md text-on-surface-variant mb-lg max-w-sm">
        这条路线似乎走丢了。页面不存在或已被移动。
      </p>
      <Link href="/">
        <Button icon="home">回到首页</Button>
      </Link>
    </div>
  );
}
