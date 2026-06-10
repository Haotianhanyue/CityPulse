import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Avatar } from "@/components/ui/Icon";
import { Card } from "@/components/ui/Card";
import { Timeline } from "@/components/Timeline";
import { mockRoutes, mockComments, mockUser } from "@/data/mock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "徐汇周日漫步 · CityPulse",
  description:
    "穿梭于复兴中路与武康路之间，探寻历史韵味与梧桐光影的城市漫步路线。",
};

export default function RouteDetailPage() {
  const route = mockRoutes[0];

  return (
    <div className="flex flex-col md:flex-row gap-xl px-margin-mobile md:px-margin-desktop py-lg pb-2xl">
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Hero */}
        <div className="mb-lg">
          <div className="flex flex-wrap items-center gap-sm mb-sm">
            <span className="px-sm py-xs rounded-full bg-secondary-container text-secondary text-caption font-caption">
              {route.category}
            </span>
            <span className="text-caption font-caption text-on-surface-variant">
              {route.location}
            </span>
            {route.isTopRated && (
              <span className="px-sm py-xs rounded-full bg-orange-100 text-orange-700 text-caption font-caption">
                高分路线
              </span>
            )}
          </div>

          <h1 className="font-headline-lg text-display-lg text-on-surface mb-sm">
            {route.title}
          </h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant">
            {route.subtitle}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-lg mt-md">
            <div className="flex items-center gap-xs">
              <Icon name="directions_walk" size={20} className="text-primary" />
              <span className="text-body-md font-body-md">{route.distance}</span>
            </div>
            <div className="flex items-center gap-xs">
              <Icon name="schedule" size={20} className="text-primary" />
              <span className="text-body-md font-body-md">{route.duration}</span>
            </div>
            <div className="flex items-center gap-xs">
              <Icon name="signal_cellular_alt" size={20} className="text-primary" />
              <span className="text-body-md font-body-md">难度: {route.difficulty}</span>
            </div>
          </div>
        </div>

        {/* Author */}
        <Card className="flex items-center justify-between p-md mb-xl">
          <div className="flex items-center gap-md">
            <Avatar
              src={route.author.avatar}
              alt={route.author.name}
              size="lg"
              bordered
            />
            <div>
              <p className="text-label-md font-label-md">{route.author.name}</p>
              <p className="text-caption font-caption text-on-surface-variant">
                Lv.{route.author.level} · {route.author.title}
              </p>
              <p className="text-caption font-caption text-on-surface-variant">
                累计: {route.author.totalDistance} | 探索点:{" "}
                {route.author.spotsExplored}
              </p>
            </div>
          </div>
          <Button variant="secondary" size="sm" icon="person_add">
            关注
          </Button>
        </Card>

        {/* Timeline */}
        <div className="mb-xl">
          <h2 className="font-headline-lg text-headline-md text-on-surface mb-lg">
            行程亮点
          </h2>
          <Timeline stops={route.stops} />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-lg mb-xl">
          <Button icon="favorite" fullWidth>
            {route.likes} 点赞
          </Button>
          <Button variant="secondary" icon="bookmark" fullWidth>
            {route.bookmarks} 收藏
          </Button>
          <Button variant="ghost" icon="share" fullWidth>
            分享
          </Button>
        </div>

        {/* Comments */}
        <div>
          <h2 className="font-headline-lg text-headline-md text-on-surface mb-md">
            社区评论 ({route.comments})
          </h2>

          {/* Comment input */}
          <div className="flex gap-md mb-lg">
            <Avatar src={mockUser.avatar} alt={mockUser.name} size="md" />
            <div className="flex-1">
              <textarea
                placeholder="分享你的探索体验..."
                className="w-full p-md rounded-xl bg-surface-container-low outline-none resize-none h-20 text-body-md font-body-md"
              />
              <div className="flex justify-end mt-sm">
                <Button size="sm">发布评论</Button>
              </div>
            </div>
          </div>

          {/* Comment list */}
          <div className="space-y-md">
            {mockComments.map((comment) => (
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
      </div>

      {/* Sidebar - Map & Related */}
      <div className="hidden md:block w-80 flex-shrink-0 space-y-lg">
        {/* Map placeholder */}
        <Card className="h-64 bg-surface-variant flex items-center justify-center">
          <div className="text-center">
            <Icon
              name="map"
              size={40}
              className="text-on-surface-variant mx-auto mb-sm"
            />
            <p className="text-caption font-caption text-on-surface-variant">
              路线地图
            </p>
          </div>
        </Card>

        {/* Start navigation */}
        <Button fullWidth icon="navigation" size="lg">
          开始导航
        </Button>

        {/* Related routes */}
        <div>
          <h3 className="text-label-md font-label-md mb-md">相关推荐</h3>
          <div className="space-y-sm">
            {mockRoutes.slice(1).map((r) => (
              <Card key={r.id} hoverable className="flex gap-sm p-sm">
                <div className="w-16 h-16 rounded-lg bg-surface-variant flex-shrink-0 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={r.coverImage}
                    alt={r.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-label-md font-label-md line-clamp-2">
                    {r.title}
                  </p>
                  <p className="text-caption font-caption text-on-surface-variant mt-xs">
                    {r.distance} · {r.duration}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
