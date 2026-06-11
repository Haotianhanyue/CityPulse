"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import {
  geocode,
  getWalkingRoute,
  isMapboxConfigured,
  type LngLat,
} from "@/lib/mapbox";

/**
 * 「开始导航」：获取用户实时定位（Geolocation API），
 * 配置 Mapbox 时对目的地做地理编码并规划步行路线，提示距离与时长；
 * 未配置时友好降级。
 */
export function NavigateButton({ destination }: { destination: string }) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const start = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      toast("当前设备不支持定位", "info");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const user: LngLat = [pos.coords.longitude, pos.coords.latitude];
        if (!isMapboxConfigured()) {
          toast("已获取你的位置（配置 Mapbox Token 可规划真实步行路线）", "info");
          setLoading(false);
          return;
        }
        const dest = await geocode(destination);
        const route = dest ? await getWalkingRoute([user, dest.center]) : null;
        if (route) {
          toast(
            `步行约 ${route.distanceKm.toFixed(1)}km · ${Math.round(route.durationMin)} 分钟`,
            "success",
          );
        } else {
          toast("未能规划到目的地的路线", "error");
        }
        setLoading(false);
      },
      () => {
        toast("定位失败，请检查浏览器权限", "error");
        setLoading(false);
      },
    );
  };

  return (
    <Button
      fullWidth
      icon={loading ? "hourglass_empty" : "navigation"}
      size="lg"
      onClick={start}
    >
      {loading ? "规划中..." : "开始导航"}
    </Button>
  );
}
