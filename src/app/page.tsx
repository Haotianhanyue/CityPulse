"use client";
import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Chip } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/Icon";
import { Card } from "@/components/ui/Card";
import { Skeleton, EmptyState } from "@/components/ui/States";
import { BottomSheet } from "@/components/BottomSheet";
import { useToast } from "@/components/ui/Toast";
import { geocode } from "@/lib/mapbox";
import { useExplore } from "@/hooks/useExplore";

// 懒加载地图：mapbox-gl 体积较大，移出首屏 bundle，仅在客户端按需加载
const MapView = dynamic(
  () => import("@/components/MapView").then((m) => m.MapView),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-gradient-to-br from-secondary-container/20 to-primary-container/20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-sm text-on-surface-variant">
          <Icon name="map" size={48} className="animate-pulse" />
          <span className="text-caption font-caption">地图加载中...</span>
        </div>
      </div>
    ),
  },
);

const categories = [
  { label: "精选", icon: "auto_awesome" },
  { label: "餐饮美食", icon: "restaurant" },
  { label: "休闲娱乐", icon: "sports_bar" },
  { label: "地标", icon: "flag" },
  { label: "购物", icon: "shopping_bag" },
];

const SHANGHAI: [number, number] = [121.4737, 31.2304];

export default function ExplorePage() {
  const [category, setCategory] = useState("精选");
  const [search, setSearch] = useState("");
  const [center, setCenter] = useState<[number, number]>(SHANGHAI);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | undefined>();
  const { toast } = useToast();

  const { data, isLoading, isError } = useExplore({
    category,
    lat: coords?.lat,
    lng: coords?.lng,
  });
  const pois = data?.data ?? [];

  const locateMe = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      toast("当前设备不支持定位", "info");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ lat: latitude, lng: longitude });
        setCenter([longitude, latitude]);
        toast("已定位到你附近，按距离排序 📍", "success");
      },
      () => toast("定位失败，请检查浏览器权限", "error"),
    );
  };

  const runSearch = async () => {
    if (!search.trim()) return;
    const result = await geocode(search);
    if (result) {
      setCenter(result.center);
      toast(`已定位：${result.name}`, "success");
    } else {
      toast("未找到地点（或未配置 Mapbox Token）", "info");
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Map */}
      <div className="absolute inset-0">
        <MapView pois={pois} center={center} />
      </div>

      {/* Search bar */}
      <div className="absolute top-20 left-0 right-0 z-20 px-margin-mobile md:px-margin-desktop">
        <div className="flex items-center gap-md bg-surface-container-lowest rounded-full shadow-lg px-md py-sm focus-within:ring-2 focus-within:ring-primary/40 transition-shadow">
          <Icon name="search" size={24} className="text-on-surface-variant" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") runSearch();
            }}
            placeholder="搜索街道、广场或隐秘的咖啡店..."
            aria-label="搜索地点"
            className="flex-1 outline-none text-body-md font-body-md bg-transparent"
          />
          <button
            onClick={locateMe}
            aria-label="定位到我的位置"
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center active:scale-90 transition-transform focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <Icon name="my_location" size={20} className="text-white" />
          </button>
        </div>

        {/* Category chips */}
        <div className="flex gap-sm mt-md overflow-x-auto hide-scrollbar">
          {categories.map((c) => (
            <Chip
              key={c.label}
              label={c.label}
              icon={c.icon}
              active={category === c.label}
              onClick={() => setCategory(c.label)}
            />
          ))}
        </div>
      </div>

      {/* Bottom Sheet */}
      <BottomSheet title="周边精选">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md mt-md">
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
          </div>
        ) : isError ? (
          <EmptyState
            icon="error"
            title="加载失败"
            description="无法获取周边推荐，请稍后重试。"
          />
        ) : pois.length === 0 ? (
          <EmptyState
            icon="wrong_location"
            title="附近暂无推荐"
            description="换个分类看看。"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md mt-md">
            {pois.map((poi) => (
              <Card key={poi.id} hoverable className="flex gap-md p-sm">
                <div className="relative w-24 h-24 rounded-lg bg-surface-variant flex-shrink-0 overflow-hidden">
                  <Image
                    src={poi.image}
                    alt={poi.name}
                    fill
                    sizes="96px"
                    className="object-cover"
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
        )}
      </BottomSheet>
    </div>
  );
}
