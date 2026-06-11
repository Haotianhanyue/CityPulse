"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Avatar } from "@/components/ui/Icon";
import { LikeButton, ShareButton } from "@/components/InteractionButtons";
import type { Post } from "@/types";

interface FeedCardProps {
  post: Post;
  index?: number;
}

const typeStyles: Record<string, string> = {
  精选路线: "bg-secondary-container text-secondary",
  隐藏宝藏: "bg-green-100 text-green-700",
  拍照圣地: "bg-purple-100 text-purple-700",
  热门活动: "bg-primary-container text-primary",
  建筑美学: "bg-blue-100 text-blue-700",
};

export function FeedCard({ post, index = 0 }: FeedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="masonry-item"
    >
      <Card hoverable>
        {/* Image */}
        {post.images.length > 0 && (
          <div className="relative w-full h-48 md:h-56 bg-surface-variant overflow-hidden">
            <Image
              src={post.images[0]}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        <div className="p-md">
          {/* Type badge */}
          <span
            className={`inline-flex items-center gap-xs px-sm py-xs rounded-full text-caption font-caption mb-sm ${typeStyles[post.type]}`}
          >
            <Icon name="local_offer" size={14} />
            {post.type}
          </span>

          {/* Title */}
          <h3 className="font-label-md text-body-md text-on-surface mb-sm line-clamp-2">
            {post.title}
          </h3>

          {/* Author */}
          <div className="flex items-center gap-sm mb-md">
            <Avatar src={post.author.avatar} alt={post.author.name} size="sm" />
            <span className="text-caption font-caption text-on-surface-variant">
              {post.author.name}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between text-caption font-caption text-on-surface-variant">
            <div className="flex items-center gap-md">
              <LikeButton id={post.id} count={post.likes} size={16} />
              <div className="flex items-center gap-xs">
                <Icon name="mode_comment" size={16} />
                <span>{post.comments}</span>
              </div>
              <ShareButton
                data={{ title: post.title, text: post.content }}
                size={16}
              />
            </div>
            <span>{post.createdAt}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
