import Image from "next/image";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Icon";
import { LikeButton, ShareButton } from "@/components/InteractionButtons";
import { FollowButton } from "@/components/FollowButton";
import { PostComments } from "@/components/PostComments";
import { getPostById, getCommentsByPostId } from "@/lib/repository";
import { mockUser } from "@/data/mock";
import type { Metadata } from "next";

const typeStyles: Record<string, string> = {
  精选路线: "bg-secondary-container text-secondary",
  隐藏宝藏: "bg-green-100 text-green-700",
  拍照圣地: "bg-purple-100 text-purple-700",
  热门活动: "bg-primary-container text-primary",
  建筑美学: "bg-blue-100 text-blue-700",
};

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const post = await getPostById(params.id);
  return {
    title: post ? `${post.title} · CityPulse` : "动态 · CityPulse",
    description: post?.content?.slice(0, 80),
  };
}

export default async function FeedDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await getPostById(params.id);
  if (!post) notFound();

  const initialComments = (await getCommentsByPostId(post.id)).data;

  return (
    <div className="max-w-2xl mx-auto px-margin-mobile md:px-margin-desktop py-lg pb-2xl">
      {/* Type badge */}
      <span
        className={`inline-flex items-center px-sm py-xs rounded-full text-caption font-caption mb-sm ${typeStyles[post.type] ?? "bg-surface-container text-on-surface-variant"}`}
      >
        {post.type}
      </span>

      {/* Title */}
      <h1 className="font-headline-lg text-display-lg text-on-surface mb-md">
        {post.title}
      </h1>

      {/* Author */}
      <Card className="flex items-center justify-between p-md mb-lg">
        <div className="flex items-center gap-md">
          <Avatar
            src={post.author.avatar}
            alt={post.author.name}
            size="lg"
            bordered
          />
          <div>
            <p className="text-label-md font-label-md">{post.author.name}</p>
            <p className="text-caption font-caption text-on-surface-variant">
              Lv.{post.author.level} · {post.author.title}
            </p>
            <p className="text-caption font-caption text-on-surface-variant">
              {post.createdAt}
            </p>
          </div>
        </div>
        <FollowButton name={post.author.name} />
      </Card>

      {/* Images */}
      {post.images.length > 0 && (
        <div className="space-y-md mb-lg">
          {post.images.map((src, i) => (
            <div
              key={i}
              className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden bg-surface-variant"
            >
              <Image
                src={src}
                alt={`${post.title} 配图 ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <p className="text-body-lg font-body-lg text-on-surface-variant whitespace-pre-line mb-xl">
        {post.content}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-md mb-xl">
        <LikeButton id={post.id} count={post.likes} pill size={20} />
        <ShareButton
          data={{ title: post.title, text: post.content }}
          pill
          size={20}
        />
      </div>

      {/* Comments */}
      <PostComments
        postId={post.id}
        initialComments={initialComments}
        currentUser={mockUser}
      />
    </div>
  );
}
