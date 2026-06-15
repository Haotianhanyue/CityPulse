"use client";
import { CommentsThread } from "@/components/CommentsThread";
import { fetchPostComments, postPostComment } from "@/lib/api-client";
import type { Comment, UserProfile } from "@/types";

/** 动态评论区：把动态专用的取数/发布函数绑定到通用 CommentsThread */
export function PostComments({
  postId,
  initialComments,
  currentUser,
}: {
  postId: string;
  initialComments: Comment[];
  currentUser: UserProfile;
}) {
  return (
    <CommentsThread
      subjectId={postId}
      queryKeyPrefix="post-comments"
      fetcher={fetchPostComments}
      poster={postPostComment}
      initialComments={initialComments}
      currentUser={currentUser}
    />
  );
}
