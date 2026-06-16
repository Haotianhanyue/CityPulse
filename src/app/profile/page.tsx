import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Avatar } from "@/components/ui/Icon";
import { RouteCard } from "@/components/RouteCard";
import { AchievementWall } from "@/components/AchievementWall";
import { ThemePicker } from "@/components/ThemePicker";
import { ComingSoonButton } from "@/components/ComingSoonButton";
import { mockUser, mockRoutes, mockPosts } from "@/data/mock";

export default function ProfilePage() {
  const expPercent =
    (mockUser.experience.current / mockUser.experience.nextLevel) * 100;

  return (
    <div className="px-margin-mobile md:px-margin-desktop py-lg pb-2xl">
      {/* Profile Hero */}
      <Card className="p-lg mb-lg">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-lg">
          <Avatar
            src={mockUser.avatar}
            alt={mockUser.name}
            size="xl"
            bordered
          />
          <div className="flex-1 text-center md:text-left">
            <h1 className="font-headline-lg text-headline-lg text-on-surface">
              {mockUser.name}
            </h1>
            <p className="text-body-md font-body-md text-on-surface-variant mt-xs">
              {mockUser.title}
            </p>

            {/* Level bar */}
            <div className="mt-md">
              <div className="flex items-center justify-between mb-xs">
                <span className="text-label-md font-label-md text-primary">
                  Lv.{mockUser.level}
                </span>
                <span className="text-caption font-caption text-on-surface-variant">
                  {mockUser.experience.current} / {mockUser.experience.nextLevel}{" "}
                  XP
                </span>
              </div>
              <div className="w-full h-2 bg-surface-variant rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-700"
                  style={{ width: `${expPercent}%` }}
                />
              </div>
            </div>

            {/* Stats Bento */}
            <div className="grid grid-cols-3 gap-md mt-lg">
              <div className="text-center p-md rounded-xl bg-primary-container/10">
                <Icon
                  name="explore"
                  size={28}
                  className="text-primary mx-auto mb-xs"
                />
                <p className="text-headline-lg-mobile font-headline-lg text-on-surface">
                  {mockUser.routesCreated}
                </p>
                <p className="text-caption font-caption text-on-surface-variant">
                  已创建路线
                </p>
              </div>
              <div className="text-center p-md rounded-xl bg-secondary-container/10">
                <Icon
                  name="directions_walk"
                  size={28}
                  className="text-secondary mx-auto mb-xs"
                />
                <p className="text-headline-lg-mobile font-headline-lg text-on-surface">
                  {mockUser.totalDistance}
                </p>
                <p className="text-caption font-caption text-on-surface-variant">
                  累计距离
                </p>
              </div>
              <div className="text-center p-md rounded-xl bg-tertiary-container/10">
                <Icon
                  name="place"
                  size={28}
                  className="text-tertiary mx-auto mb-xs"
                />
                <p className="text-headline-lg-mobile font-headline-lg text-on-surface">
                  {mockUser.spotsExplored}
                </p>
                <p className="text-caption font-caption text-on-surface-variant">
                  探索地点
                </p>
              </div>
            </div>
          </div>

          <ComingSoonButton
            icon="edit"
            message="资料编辑功能即将上线 ✨"
          >
            编辑
          </ComingSoonButton>
        </div>
      </Card>

      {/* Achievement Wall */}
      <AchievementWall user={mockUser} />

      {/* Theme Picker */}
      <ThemePicker />

      {/* New Route CTA */}
      <div className="flex items-center justify-between mb-lg">
        <h2 className="font-headline-lg text-headline-md text-on-surface">
          我的内容
        </h2>
        <Link href="/routes/new">
          <Button icon="add" size="sm">
            新建路线
          </Button>
        </Link>
      </div>

      {/* Saved Routes - horizontal scroll */}
      <div className="mb-xl">
        <h3 className="text-label-md font-label-md text-on-surface mb-md">
          保存的路线
        </h3>
        <div className="flex gap-md overflow-x-auto hide-scrollbar pb-sm snap-x">
          {mockRoutes.map((route) => (
            <RouteCard key={route.id} route={route} variant="vertical" />
          ))}
        </div>
      </div>

      {/* My Posts - bento grid */}
      <div>
        <h3 className="text-label-md font-label-md text-on-surface mb-md">
          我的发布
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
          {mockPosts.slice(0, 4).map((post) => (
            <Card key={post.id} hoverable>
              <div className="relative h-32 bg-surface-variant overflow-hidden">
                <Image
                  src={post.images[0]}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-sm">
                <p className="text-caption font-caption text-on-surface line-clamp-2">
                  {post.title}
                </p>
                <div className="flex items-center gap-sm mt-xs text-caption font-caption text-on-surface-variant">
                  <div className="flex items-center gap-xs">
                    <Icon name="favorite" size={12} />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-xs">
                    <Icon name="mode_comment" size={12} />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
