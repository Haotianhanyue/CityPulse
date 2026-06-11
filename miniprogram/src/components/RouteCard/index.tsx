import { View, Text, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import type { Route } from "@/types";
import "./index.scss";

const diffClass: Record<string, string> = {
  轻松: "easy",
  中等: "medium",
  挑战: "hard",
};

export default function RouteCard({ route }: { route: Route }) {
  const goDetail = () => {
    Taro.navigateTo({ url: `/pages/route-detail/index?id=${route.id}` });
  };

  return (
    <View className="route-card" onClick={goDetail}>
      <Image className="cover" src={route.coverImage} mode="aspectFill" />
      <View className="body">
        <View className="tags">
          <Text className="tag tag-cat">{route.category}</Text>
          <Text className="loc">{route.location}</Text>
          {route.isTopRated && <Text className="tag tag-top">高分</Text>}
        </View>
        <Text className="title">{route.title}</Text>
        <Text className="subtitle">{route.subtitle}</Text>
        <View className="meta">
          <Text className="meta-item">🚶 {route.distance}</Text>
          <Text className="meta-item">⏱ {route.duration}</Text>
          <Text className={`diff diff-${diffClass[route.difficulty]}`}>
            {route.difficulty}
          </Text>
        </View>
        <View className="footer">
          <View className="author">
            <Image className="avatar" src={route.author.avatar} mode="aspectFill" />
            <Text className="author-name">{route.author.name}</Text>
          </View>
          <View className="stats">
            <Text className="stat">♥ {route.likes}</Text>
            <Text className="stat">🔖 {route.bookmarks}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
