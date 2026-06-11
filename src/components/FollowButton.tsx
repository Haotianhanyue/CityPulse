"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

/** 关注 / 已关注 切换（本地状态 + 轻提示） */
export function FollowButton({ name }: { name: string }) {
  const [following, setFollowing] = useState(false);
  const { toast } = useToast();

  return (
    <Button
      variant={following ? "ghost" : "secondary"}
      size="sm"
      icon={following ? "check" : "person_add"}
      onClick={() => {
        setFollowing((v) => !v);
        toast(following ? `已取消关注 ${name}` : `已关注 ${name}`, "success");
      }}
    >
      {following ? "已关注" : "关注"}
    </Button>
  );
}
