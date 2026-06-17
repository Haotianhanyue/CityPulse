"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CommentComposer } from "@/components/CommentComposer";
import { Avatar, Icon } from "@/components/ui/Icon";
import { useToast } from "@/components/ui/Toast";
import type { Comment, Collection, UserProfile } from "@/types";

/**
 * 通用评论区（客户端）：路线 / 动态共用。
 * - 列表走 TanStack Query，首屏由服务端 initialComments 注入，无加载闪烁
 * - 发布走乐观更新；失败（如无数据库 503）保留本地条目并提示，不崩溃
 */
export function CommentsThread({
  subjectId,
  queryKeyPrefix,
  fetcher,
  poster,
  initialComments,
  currentUser,
}: {
  subjectId: string;
  queryKeyPrefix: string;
  fetcher: (id: string) => Promise<Collection<Comment>>;
  poster: (id: string, content: string) => Promise<Comment>;
  initialComments: Comment[];
  currentUser: UserProfile;
}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const queryKey = [queryKeyPrefix, subjectId];

  const { data } = useQuery({
    queryKey,
    queryFn: () => fetcher(subjectId),
    initialData: {
      data: initialComments,
      total: initialComments.length,
    } as Collection<Comment>,
  });
  const comments = data?.data ?? [];

  const add = useMutation({
    mutationFn: (content: string) => poster(subjectId, content),
    onMutate: async (content: string) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<Collection<Comment>>(queryKey);
      const optimistic: Comment = {
        id: `temp-${Date.now()}`,
        author: currentUser,
        content,
        createdAt: "刚刚",
        likes: 0,
      };
      queryClient.setQueryData<Collection<Comment>>(queryKey, (old) => ({
        data: [optimistic, ...(old?.data ?? [])],
        total: (old?.total ?? 0) + 1,
      }));
      return { previous };
    },
    onError: () => {
      toast("演示模式：评论已显示，但未保存到服务器", "info");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return (
    <div>
      <h2 className="font-headline-lg text-headline-md text-on-surface mb-md">
        社区评论 ({comments.length})
      </h2>

      <CommentComposer
        avatar={currentUser.avatar}
        name={currentUser.name}
        onSubmit={async (content) => {
          await add.mutateAsync(content);
        }}
        pending={add.isPending}
      />

      <div className="space-y-md">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-md">
            <Avatar
              src={comment.author.avatar}
              alt={comment.author.name}
              size="md"
            />
            <div className="flex-1">
              <div className="flex items-center gap-sm mb-xs">
                <span className="text-label-md font-label-md">
                  {comment.author.name}
                </span>
                <span className="text-caption font-caption text-on-surface-variant">
                  {comment.createdAt}
                </span>
              </div>
              <p className="text-body-md font-body-md text-on-surface-variant">
                {comment.content}
              </p>
              <div className="flex items-center gap-md mt-sm text-caption font-caption text-on-surface-variant">
                <div className="flex items-center gap-xs cursor-pointer hover:text-primary">
                  <Icon name="thumb_up" size={14} />
                  <span>{comment.likes}</span>
                </div>
                <div className="flex items-center gap-xs cursor-pointer hover:text-primary">
                  <Icon name="reply" size={14} />
                  <span>回复</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
