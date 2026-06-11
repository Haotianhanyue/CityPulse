// ============================================================
// Mapbox 服务封装：步行路线(Directions) + 地点搜索(Geocoding)
// ------------------------------------------------------------
// 需要 NEXT_PUBLIC_MAPBOX_TOKEN。未配置时所有函数返回 null，
// 调用方据此降级（不阻断流程）。
// ============================================================
const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export const MAP_STYLE =
  process.env.NEXT_PUBLIC_MAPBOX_STYLE || "mapbox://styles/mapbox/light-v11";

export type LngLat = [number, number]; // [lng, lat]

export function isMapboxConfigured(): boolean {
  return Boolean(TOKEN);
}

export interface GeocodeResult {
  name: string;
  center: LngLat;
}

/** 地点搜索 / 逆地理编码（返回首个匹配） */
export async function geocode(query: string): Promise<GeocodeResult | null> {
  if (!TOKEN || !query.trim()) return null;
  try {
    const url =
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json` +
      `?access_token=${TOKEN}&limit=1&language=zh`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const json = await res.json();
    const feature = json.features?.[0];
    if (!feature) return null;
    return { name: feature.place_name, center: feature.center as LngLat };
  } catch {
    return null;
  }
}

/** 步行路线规划，返回 GeoJSON 折线坐标与距离/时长 */
export interface WalkingRoute {
  coordinates: LngLat[];
  distanceKm: number;
  durationMin: number;
}

export async function getWalkingRoute(
  waypoints: LngLat[],
): Promise<WalkingRoute | null> {
  if (!TOKEN || waypoints.length < 2) return null;
  try {
    const coords = waypoints.map((w) => w.join(",")).join(";");
    const url =
      `https://api.mapbox.com/directions/v5/mapbox/walking/${coords}` +
      `?access_token=${TOKEN}&geometries=geojson&overview=full`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const json = await res.json();
    const route = json.routes?.[0];
    if (!route) return null;
    return {
      coordinates: route.geometry.coordinates as LngLat[],
      distanceKm: route.distance / 1000,
      durationMin: route.duration / 60,
    };
  } catch {
    return null;
  }
}
