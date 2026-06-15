import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Avatar } from "@/components/ui/Icon";
import { Card } from "@/components/ui/Card";
import { Timeline } from "@/components/Timeline";
import {
  LikeButton,
  BookmarkButton,
  ShareButton,
} from "@/components/InteractionButtons";
import { FollowButton } from "@/components/FollowButton";
import { RouteComments } from "@/components/RouteComments";
import { NavigateButton } from "@/components/NavigateButton";
import { getRouteById, getRoutes, getCommentsByRouteId } from "@/lib/repository";
import { mockUser } from "@/data/mock";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "徐汇周日漫步 · CityPulse",
  description:
    "穿梭于复兴中路与武康路之间，探寻历史韵味与梧桐光影的城市漫步路线。",
};

export default async function RouteDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const route = await getRouteById(params.id);
  if (!route) notFound();

  const related = (await getRoutes({ pageSize: 4 })).data
    .filter((r) => r.id !== route.id)
    .slice(0, 2);

  const initialComments = (await getCommentsByRouteId(route.id)).data;

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
          <FollowButton name={route.author.name} />
        </Card>

        {/* Timeline */}
        <div className="mb-xl">
          <h2 className="font-headline-lg text-headline-md text-on-surface mb-lg">
            行程亮点
          </h2>
          <Timeline stops={route.stops} />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-md mb-xl">
          <LikeButton id={route.id} count={route.likes} pill size={20} />
          <BookmarkButton id={route.id} count={route.bookmarks} pill size={20} />
          <ShareButton
            data={{ title: route.title, text: route.subtitle }}
            pill
            size={20}
          />
        </div>

        {/* Comments */}
        <RouteComments
          routeId={route.id}
          initialComments={initialComments}
          currentUser={mockUser}
        />
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
        <NavigateButton destination={route.location} />

        {/* Related routes */}
        <div>
          <h3 className="text-label-md font-label-md mb-md">相关推荐</h3>
          <div className="space-y-sm">
            {related.map((r) => (
              <Card key={r.id} hoverable className="flex gap-sm p-sm">
                <div className="relative w-16 h-16 rounded-lg bg-surface-variant flex-shrink-0 overflow-hidden">
                  <Image
                    src={r.coverImage}
                    alt={r.title}
                    fill
                    sizes="64px"
                    className="object-cover"
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
