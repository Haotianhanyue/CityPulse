"use client";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { POI } from "@/types";

interface MapViewProps {
  pois?: POI[];
  center?: [number, number];
  zoom?: number;
  className?: string;
  onPoiClick?: (poi: POI) => void;
}

const categoryIcons: Record<string, string> = {
  餐饮美食: "restaurant",
  休闲娱乐: "park",
  地标: "flag",
  购物: "shopping_bag",
};

export function MapView({
  pois = [],
  center = [121.4737, 31.2304], // 上海市中心
  zoom = 13,
  className = "w-full h-full",
  onPoiClick,
}: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      // 无 token 时显示占位
      setLoaded(true);
      return;
    }

    mapboxgl.accessToken = token;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center,
      zoom,
      attributionControl: false,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
      }),
      "top-right"
    );

    map.current.on("load", () => setLoaded(true));

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [center, zoom]);

  // 添加 POI 标记
  useEffect(() => {
    if (!map.current || !loaded || !process.env.NEXT_PUBLIC_MAPBOX_TOKEN) return;

    pois.forEach((poi) => {
      const el = document.createElement("div");
      el.className = `map-marker ${poi.isPulse ? "animate-marker-pulse" : ""}`;
      el.style.cssText = `
        width: 40px; height: 40px; border-radius: 50%;
        background: ${poi.isPulse ? "#ff6b35" : "#87bcfe"};
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      `;
      el.innerHTML = `<span class="material-symbols-outlined" style="color:white;font-size:20px">${categoryIcons[poi.category] || "place"}</span>`;

      new mapboxgl.Marker({ element: el })
        .setLngLat([poi.location.lng, poi.location.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div style="font-family:Inter,sans-serif;padding:4px">
              <strong style="font-size:14px">${poi.name}</strong>
              <p style="font-size:12px;color:#594139;margin:4px 0">${poi.category} · ${poi.distance}</p>
              <p style="font-size:12px">${poi.description.slice(0, 60)}...</p>
            </div>
          `)
        )
        .addTo(map.current!);

      el.addEventListener("click", () => onPoiClick?.(poi));
    });
  }, [pois, loaded, onPoiClick]);

  // 无 token 时的占位视图
  if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
    return (
      <div
        ref={mapContainer}
        className={`${className} bg-gradient-to-br from-secondary-container/20 to-primary-container/20 flex items-center justify-center`}
      >
        <div className="text-center">
          <span
            className="material-symbols-outlined text-secondary-container mx-auto block mb-md"
            style={{ fontSize: 64 }}
          >
            map
          </span>
          <p className="text-body-lg font-body-lg text-on-surface-variant">
            探索城市地图
          </p>
          <p className="text-caption font-caption text-on-surface-variant mt-sm max-w-xs">
            配置 <code className="bg-surface-variant px-1 rounded">NEXT_PUBLIC_MAPBOX_TOKEN</code> 以启用真实地图
          </p>
          {/* 模拟标记点 */}
          {pois.slice(0, 3).map((poi, i) => (
            <div
              key={poi.id}
              className={`inline-flex items-center gap-xs px-sm py-xs rounded-full m-1 text-caption font-caption ${poi.isPulse ? "bg-primary-container text-primary" : "bg-secondary-container text-secondary"}`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                {categoryIcons[poi.category] || "place"}
              </span>
              {poi.name}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <div ref={mapContainer} className={className} />;
}
