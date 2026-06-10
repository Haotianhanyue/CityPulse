import { Chip } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/Icon";
import { Card } from "@/components/ui/Card";
import { BottomSheet } from "@/components/BottomSheet";
import { MapView } from "@/components/MapView";
import { mockPOIs } from "@/data/mock";

const categories = [
  { label: "餐饮美食", icon: "restaurant" },
  { label: "休闲娱乐", icon: "sports_bar" },
  { label: "地标", icon: "flag" },
  { label: "购物", icon: "shopping_bag" },
];

export default function ExplorePage() {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Map */}
      <div className="absolute inset-0">
        <MapView pois={mockPOIs} />
      </div>

      {/* Search bar */}
      <div className="absolute top-20 left-0 right-0 z-20 px-margin-mobile md:px-margin-desktop">
        <div className="flex items-center gap-md bg-surface-container-lowest rounded-full shadow-lg px-md py-sm">
          <Icon name="search" size={24} className="text-on-surface-variant" />
          <input
            type="text"
            placeholder="搜索街道、广场或隐秘的咖啡店..."
            className="flex-1 outline-none text-body-md font-body-md bg-transparent"
          />
          <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Icon name="location_on" size={20} className="text-white" />
          </button>
        </div>

        {/* Category chips */}
        <div className="flex gap-sm mt-md overflow-x-auto hide-scrollbar">
          <Chip label="精选" active icon="auto_awesome" />
          {categories.map((c) => (
            <Chip key={c.label} label={c.label} icon={c.icon} />
          ))}
        </div>
      </div>

      {/* Bottom Sheet */}
      <BottomSheet title="周边精选">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md mt-md">
          {mockPOIs.map((poi) => (
            <Card key={poi.id} hoverable className="flex gap-md p-sm">
              <div className="w-24 h-24 rounded-lg bg-surface-variant flex-shrink-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={poi.image}
                  alt={poi.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-xs mb-xs">
                  <span className="text-caption font-caption text-secondary">
                    {poi.category}
                  </span>
                  {poi.isPulse && (
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </div>
                <h4 className="text-label-md font-label-md text-on-surface mb-xs truncate">
                  {poi.name}
                </h4>
                <div className="flex items-center gap-sm text-caption font-caption text-on-surface-variant">
                  <div className="flex items-center gap-xs">
                    <Icon name="star" filled size={14} className="text-primary" />
                    <span>{poi.rating}</span>
                  </div>
                  <span>{poi.distance}</span>
                  <span
                    className={
                      poi.status === "营业中"
                        ? "text-green-600"
                        : poi.status === "即将闭店"
                          ? "text-red-600"
                          : "text-on-surface-variant"
                    }
                  >
                    {poi.status}
                  </span>
                </div>
                <div className="flex gap-xs mt-xs">
                  {poi.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-caption font-caption px-xs py-0.5 rounded bg-surface-variant text-on-surface-variant"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </BottomSheet>
    </div>
  );
}
