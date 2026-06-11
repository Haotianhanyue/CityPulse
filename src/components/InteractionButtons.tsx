"use client";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { Icon } from "@/components/ui/Icon";
import { useInteractions, displayCount } from "@/store/useInteractions";
import { useToast } from "@/components/ui/Toast";
import { shareContent, type ShareData } from "@/lib/share";

const pillClass =
  "flex items-center justify-center gap-sm rounded-lg px-md py-sm font-label-md text-label-md border border-outline-variant transition-colors";
const inlineClass =
  "flex items-center gap-xs transition-colors hover:text-primary";

export function LikeButton({
  id,
  count,
  pill = false,
  size = 18,
}: {
  id: string;
  count: number;
  pill?: boolean;
  size?: number;
}) {
  const liked = useInteractions((s) => !!s.liked[id]);
  const toggle = useInteractions((s) => s.toggleLike);
  const { toast } = useToast();

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      aria-pressed={liked}
      aria-label={liked ? "取消点赞" : "点赞"}
      onClick={() => {
        toggle(id);
        toast(liked ? "已取消点赞" : "已点赞 ❤️", "success");
      }}
      className={clsx(
        pill ? "flex-1 " + pillClass : inlineClass,
        liked && "text-primary",
      )}
    >
      <Icon
        name={liked ? "favorite" : "favorite_border"}
        filled={liked}
        size={size}
      />
      <span>{displayCount(count, liked)}</span>
      {pill && <span>点赞</span>}
    </motion.button>
  );
}

export function BookmarkButton({
  id,
  count,
  pill = false,
  size = 18,
}: {
  id: string;
  count: number;
  pill?: boolean;
  size?: number;
}) {
  const saved = useInteractions((s) => !!s.bookmarked[id]);
  const toggle = useInteractions((s) => s.toggleBookmark);
  const { toast } = useToast();

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      aria-pressed={saved}
      aria-label={saved ? "取消收藏" : "收藏"}
      onClick={() => {
        toggle(id);
        toast(saved ? "已取消收藏" : "已收藏 🔖", "success");
      }}
      className={clsx(
        pill ? "flex-1 " + pillClass : inlineClass,
        saved && "text-secondary",
      )}
    >
      <Icon name={saved ? "bookmark" : "bookmark_border"} filled={saved} size={size} />
      <span>{displayCount(count, saved)}</span>
      {pill && <span>收藏</span>}
    </motion.button>
  );
}

export function ShareButton({
  data,
  pill = false,
  size = 18,
}: {
  data: ShareData;
  pill?: boolean;
  size?: number;
}) {
  const { toast } = useToast();

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      aria-label="分享"
      onClick={async () => {
        const result = await shareContent(data);
        if (result === "copied") toast("链接已复制到剪贴板", "success");
        else if (result === "failed") toast("分享失败，请稍后再试", "error");
      }}
      className={clsx(pill ? "flex-1 " + pillClass : inlineClass)}
    >
      <Icon name="share" size={size} />
      {pill && <span>分享</span>}
    </motion.button>
  );
}
