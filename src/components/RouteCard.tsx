import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Avatar } from "@/components/ui/Icon";
import type { Route } from "@/types";

interface RouteCardProps {
  route: Route;
  variant?: "horizontal" | "vertical";
}

export function RouteCard({ route, variant = "horizontal" }: RouteCardProps) {
  const difficultyColor = {
    轻松: "text-green-600 bg-green-50",
    中等: "text-yellow-700 bg-yellow-50",
    挑战: "text-red-600 bg-red-50",
  }[route.difficulty];

  if (variant === "vertical") {
    return (
      <Card hoverable className="max-w-xs flex-shrink-0 snap-center">
        <div className="relative h-32 w-full bg-surface-variant overflow-hidden">
          <Image
            src={route.coverImage}
            alt={route.title}
            fill
            sizes="(max-width: 768px) 80vw, 320px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-md">
          <p className="text-caption font-caption text-on-surface-variant mb-xs">
            {route.location}
          </p>
          <h3 className="text-body-md font-label-md text-on-surface mb-sm line-clamp-2">
            {route.title}
          </h3>
          <div className="flex items-center gap-sm text-caption font-caption text-on-surface-variant">
            <span>{route.distance}</span>
            <span>·</span>
            <span>{route.duration}</span>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card hoverable>
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative md:w-1/3 h-48 md:h-auto bg-surface-variant overflow-hidden">
          <Image
            src={route.coverImage}
            alt={route.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Info */}
        <div className="p-md md:p-lg flex-1 flex flex-col">
          <div className="flex items-center gap-sm mb-sm">
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

          <h3 className="font-headline-md text-headline-lg-mobile md:text-headline-lg mb-sm">
            {route.title}
          </h3>
          <p className="text-body-md font-body-md text-on-surface-variant mb-md">
            {route.subtitle}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-lg mb-md">
            <div className="flex items-center gap-xs text-caption font-caption text-on-surface-variant">
              <Icon name="directions_walk" size={16} />
              <span>{route.distance}</span>
            </div>
            <div className="flex items-center gap-xs text-caption font-caption text-on-surface-variant">
              <Icon name="schedule" size={16} />
              <span>{route.duration}</span>
            </div>
            <span
              className={`px-sm py-xs rounded-full text-caption font-caption ${difficultyColor}`}
            >
              {route.difficulty}
            </span>
          </div>

          {/* Author + Actions */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-sm">
              <Avatar src={route.author.avatar} alt={route.author.name} size="md" />
              <div>
                <p className="text-label-md font-label-md">{route.author.name}</p>
                <p className="text-caption font-caption text-on-surface-variant">
                  Lv.{route.author.level} · {route.author.title}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-md text-caption font-caption text-on-surface-variant">
              <div className="flex items-center gap-xs">
                <Icon name="favorite" size={16} />
                <span>{route.likes}</span>
              </div>
              <div className="flex items-center gap-xs">
                <Icon name="bookmark" size={16} />
                <span>{route.bookmarks}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
