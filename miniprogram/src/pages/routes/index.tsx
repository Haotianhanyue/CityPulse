import { useState, useEffect } from "react";
import { View, Text, ScrollView } from "@tarojs/components";
import RouteCard from "@/components/RouteCard";
import { fetchRoutes } from "@/services/request";
import type { Route } from "@/types";
import "./index.scss";

const filters = ["精选", "城市漫步", "文化探访", "美食之旅", "夜骑"];

export default function Routes() {
  const [category, setCategory] = useState("精选");
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchRoutes({ category }).then((res) => {
      setRoutes(res.data);
      setLoading(false);
    });
  }, [category]);

  return (
    <View className="page-container">
      <Text className="section-title">发现路线</Text>
      <Text className="page-sub muted">探索城市中的独特漫步路线</Text>

      <ScrollView scrollX className="chips hide-scrollbar">
        {filters.map((f) => (
          <Text
            key={f}
            className={`chip ${category === f ? "chip-active" : ""}`}
            onClick={() => setCategory(f)}
          >
            {f}
          </Text>
        ))}
      </ScrollView>

      {loading ? (
        <Text className="muted state">加载中...</Text>
      ) : routes.length === 0 ? (
        <Text className="muted state">暂无匹配路线</Text>
      ) : (
        routes.map((r) => <RouteCard key={r.id} route={r} />)
      )}
    </View>
  );
}
