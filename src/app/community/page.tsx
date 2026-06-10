import { Chip } from "@/components/ui/Chip";
import { FeedCard } from "@/components/FeedCard";
import { mockPosts } from "@/data/mock";

export default function CommunityPage() {
  return (
    <div className="px-margin-mobile md:px-margin-desktop py-lg">
      {/* Header */}
      <div className="mb-lg">
        <h1 className="font-headline-lg text-display-lg text-on-surface">
          社区动态
        </h1>
        <p className="text-body-md font-body-md text-on-surface-variant mt-sm">
          发现城市探索者的精彩分享
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-sm mb-lg overflow-x-auto hide-scrollbar">
        <Chip label="Trending" active icon="trending_up" />
        <Chip label="Following" icon="group" />
        <Chip label="Nearby" icon="near_me" />
      </div>

      {/* Masonry feed */}
      <div className="masonry-grid">
        {mockPosts.map((post, i) => (
          <FeedCard key={post.id} post={post} index={i} />
        ))}
      </div>
    </div>
  );
}
