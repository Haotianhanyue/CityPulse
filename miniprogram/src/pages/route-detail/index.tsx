import { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, Button } from "@tarojs/components";
import Taro, { useRouter, useShareAppMessage } from "@tarojs/taro";
import { fetchRouteById } from "@/services/request";
import { likeRoute, bookmarkRoute } from "@/services/interactions";
import type { Route } from "@/types";
import "./index.scss";

export default function RouteDetail() {
  const router = useRouter();
  const [route, setRoute] = useState<Route | null>(null);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(0);
  const [bookmarks, setBookmarks] = useState(0);

  useEffect(() => {
    const id = router.params.id || "r-001";
    fetchRouteById(id).then((r) => {
      if (r) {
        setRoute(r);
        setLikes(r.likes);
        setBookmarks(r.bookmarks);
      }
    });
  }, [router.params.id]);

  // 微信原生分享（右上角胶囊菜单 + 下方分享按钮）
  useShareAppMessage(() => ({
    title: route?.title ?? "CityPulse · 城市漫步",
    path: `/pages/route-detail/index?id=${route?.id ?? "r-001"}`,
    imageUrl: route?.coverImage,
  }));

  if (!route) {
    return (
      <View className="page-container">
        <Text className="muted">加载中...</Text>
      </View>
    );
  }

  const onLike = async () => {
    const res = await likeRoute(route.id);
    if (res) {
      setLiked(res.active);
      setLikes(res.count);
      Taro.showToast({ title: res.active ? "已点赞 ❤️" : "已取消点赞", icon: "none" });
    } else {
      // 后端不可用 → 本地乐观
      const next = !liked;
      setLiked(next);
      setLikes((c) => c + (next ? 1 : -1));
      Taro.showToast({ title: next ? "已点赞（演示）" : "已取消", icon: "none" });
    }
  };

  const onSave = async () => {
    const res = await bookmarkRoute(route.id);
    if (res) {
      setSaved(res.active);
      setBookmarks(res.count);
      Taro.showToast({ title: res.active ? "已收藏 🔖" : "已取消收藏", icon: "none" });
    } else {
      const next = !saved;
      setSaved(next);
      setBookmarks((c) => c + (next ? 1 : -1));
      Taro.showToast({ title: next ? "已收藏（演示）" : "已取消", icon: "none" });
    }
  };

  return (
    <ScrollView scrollY className="detail">
      <Image className="hero" src={route.coverImage} mode="aspectFill" />
      <View className="content">
        <View className="tags">
          <Text className="tag">{route.category}</Text>
          <Text className="loc muted">{route.location}</Text>
        </View>
        <Text className="title">{route.title}</Text>
        <Text className="subtitle muted">{route.subtitle}</Text>
        <View className="meta">
          <Text>🚶 {route.distance}</Text>
          <Text>⏱ {route.duration}</Text>
          <Text>难度 {route.difficulty}</Text>
        </View>

        <View className="author">
          <Image className="a-avatar" src={route.author.avatar} mode="aspectFill" />
          <View className="a-info">
            <Text className="a-name">{route.author.name}</Text>
            <Text className="a-sub muted">
              Lv.{route.author.level} · {route.author.title}
            </Text>
          </View>
        </View>

        <Text className="section">行程亮点</Text>
        <View className="timeline">
          {route.stops.length === 0 && <Text className="muted">暂无详细行程</Text>}
          {route.stops.map((s) => (
            <View key={s.order} className="stop">
              <View className="dot-col">
                <View className="dot">{s.order}</View>
                <View className="line" />
              </View>
              <View className="stop-body">
                <View className="stop-head">
                  <Text className="stop-name">{s.name}</Text>
                  <Text className="stop-time muted">{s.time}</Text>
                </View>
                {s.images[0] && (
                  <Image className="stop-img" src={s.images[0]} mode="aspectFill" />
                )}
                <Text className="stop-desc">{s.description}</Text>
                {s.tips && <Text className="stop-tip">💡 {s.tips}</Text>}
              </View>
            </View>
          ))}
        </View>

        <View className="actions">
          <View className={`act ${liked ? "act-on" : ""}`} onClick={onLike}>
            {liked ? "❤️" : "♡"} {likes}
          </View>
          <View className={`act ${saved ? "act-on" : ""}`} onClick={onSave}>
            {saved ? "🔖" : "🏷"} {bookmarks}
          </View>
          <Button className="act act-share" openType="share">
            ↗ 分享
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
