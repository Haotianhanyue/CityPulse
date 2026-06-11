// ============================================================
// 地理空间工具（PostGIS 的轻量 JS 等价物）
// ------------------------------------------------------------
// 开发用 SQLite 无 PostGIS，用 Haversine 在应用层算距离；
// 生产 PostgreSQL 可改用 ST_Distance / ST_DWithin 下推到数据库。
// ============================================================
export interface LatLng {
  lat: number;
  lng: number;
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/** 两点间球面距离（公里） */
export function haversineKm(a: LatLng, b: LatLng): number {
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

/** 距离的中文友好格式（<1km 显示米） */
export function formatDistance(km: number): string {
  return km < 1 ? `${Math.round(km * 1000)}m` : `${km.toFixed(1)}km`;
}

/** 按到 origin 的距离升序排序，并重写每项的 distance 文案 */
export function sortByDistance<T extends { location: LatLng; distance: string }>(
  items: T[],
  origin: LatLng,
): T[] {
  return items
    .map((item) => ({ item, d: haversineKm(origin, item.location) }))
    .sort((a, b) => a.d - b.d)
    .map(({ item, d }) => ({ ...item, distance: formatDistance(d) }));
}
