"use client";
import { CommentsThread } from "@/components/CommentsThread";
import { fetchRouteComments, postRouteComment } from "@/lib/api-client";
import type { Comment, UserProfile } from "@/types";

/** 路线评论区：把路线专用的取数/发布函数绑定到通用 CommentsThread */
export function RouteComments({
  routeId,
  initialComments,
  currentUser,
}: {
  routeId: string;
  initialComments: Comment[];
  currentUser: UserProfile;
}) {
  return (
    <CommentsThread
      subjectId={routeId}
      queryKeyPrefix="route-comments"
      fetcher={fetchRouteComments}
      poster={postRouteComment}
      initialComments={initialComments}
      currentUser={currentUser}
    />
  );
}
