"use client";
import { useState } from "react";
import { Avatar } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

/**
 * 评论输入框：本地校验 + 发布。
 * 传入 onSubmit 时走真实发布（乐观更新由调用方负责）；否则保留演示回退。
 */
export function CommentComposer({
  avatar,
  name,
  onSubmit,
  pending = false,
}: {
  avatar: string;
  name: string;
  onSubmit?: (content: string) => Promise<void> | void;
  pending?: boolean;
}) {
  const [value, setValue] = useState("");
  const { toast } = useToast();

  const submit = async () => {
    const content = value.trim();
    if (!content) {
      toast("评论内容不能为空", "error");
      return;
    }
    if (content.length > 500) {
      toast("评论不能超过 500 字", "error");
      return;
    }
    if (onSubmit) {
      setValue(""); // 乐观清空，调用方负责把评论加入列表
      try {
        await onSubmit(content);
      } catch {
        /* 调用方负责错误提示；输入已清空，乐观条目保留 */
      }
      return;
    }
    toast("评论已发布 🎉", "success");
    setValue("");
  };

  return (
    <div className="flex gap-md mb-lg">
      <Avatar src={avatar} alt={name} size="md" />
      <div className="flex-1">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") submit();
          }}
          placeholder="分享你的探索体验...（⌘/Ctrl + Enter 发布）"
          className="w-full p-md rounded-xl bg-surface-container-low outline-none focus:ring-2 focus:ring-primary/40 resize-none h-20 text-body-md font-body-md transition-shadow"
        />
        <div className="flex justify-between items-center mt-sm">
          <span className="text-caption font-caption text-on-surface-variant">
            {value.length}/500
          </span>
          <Button size="sm" onClick={submit} disabled={pending}>
            {pending ? "发布中…" : "发布评论"}
          </Button>
        </div>
      </div>
    </div>
  );
}
