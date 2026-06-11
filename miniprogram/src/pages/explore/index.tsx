import { useState, useEffect } from "react";
import { View, Text, Map, ScrollView, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { fetchPOIs } from "@/services/request";
import markerIcon from "@/assets/marker.png";
import type { POI } from "@/types";
import "./index.scss";

const categories = ["精选", "餐饮美食", "休闲娱乐", "地标", "购物"];

export default function Explore() {
  const [category, setCategory] = useState("精选");
  const [pois, setPois] = useState<POI[]>([]);
  const [center, setCenter] = useState({ lat: 31.2304, lng: 121.4737 });

  useEffect(() => {
    fetchPOIs({ category }).then((res) => setPois(res.data));
  }, [category]);

  const markers = pois.map((p, i) => ({
    id: i,
    latitude: p.location.lat,
    longitude: p.location.lng,
    title: p.name,
    iconPath: markerIcon,
    width: 32,
    height: 38,
  }));

  const locate = () => {
    Taro.getLocation({ type: "gcj02" })
      .then((res) => {
        setCenter({ lat: res.latitude, lng: res.longitude });
        Taro.showToast({ title: "已定位到你附近 📍", icon: "none" });
      })
      .catch(() => Taro.showToast({ title: "定位失败，请检查权限", icon: "none" }));
  };

  return (
    <View className="explore">
      <Map
        className="map"
        latitude={center.lat}
        longitude={center.lng}
        markers={markers}
        scale={13}
        showLocation
      />

      <View className="overlay">
        <View className="search">
          <Text className="search-ph">搜索街道、广场或隐秘的咖啡店...</Text>
          <View className="locate-btn" onClick={locate}>
            📍
          </View>
        </View>
        <ScrollView scrollX className="chips hide-scrollbar">
          {categories.map((c) => (
            <Text
              key={c}
              className={`chip ${category === c ? "chip-active" : ""}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </Text>
          ))}
        </ScrollView>
      </View>

      <View className="sheet">
        <View className="handle" />
        <Text className="sheet-title">周边精选</Text>
        <ScrollView scrollY className="poi-list">
          {pois.map((poi) => (
            <View key={poi.id} className="poi">
              <Image className="poi-img" src={poi.image} mode="aspectFill" />
              <View className="poi-body">
                <Text className="poi-cat">{poi.category}</Text>
                <Text className="poi-name">{poi.name}</Text>
                <View className="poi-meta">
                  <Text>⭐ {poi.rating}</Text>
                  <Text>{poi.distance}</Text>
                  <Text
                    className={
                      poi.status === "营业中"
                        ? "open"
                        : poi.status === "即将闭店"
                          ? "closing"
                          : ""
                    }
                  >
                    {poi.status}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
