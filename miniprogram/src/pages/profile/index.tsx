import { View, Text, Image, ScrollView } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { mockUser, mockRoutes } from "@/data/mock";
import "./index.scss";

export default function Profile() {
  const u = mockUser;
  const pct = Math.round((u.experience.current / u.experience.nextLevel) * 100);

  return (
    <View className="page-container">
      <View className="hero">
        <Image className="avatar" src={u.avatar} mode="aspectFill" />
        <Text className="name">{u.name}</Text>
        <Text className="title muted">{u.title}</Text>

        <View className="level">
          <View className="level-top">
            <Text className="lv">Lv.{u.level}</Text>
            <Text className="xp muted">
              {u.experience.current}/{u.experience.nextLevel} XP
            </Text>
          </View>
          <View className="bar">
            <View className="bar-fill" style={{ width: `${pct}%` }} />
          </View>
        </View>

        <View className="stats">
          <View className="stat">
            <Text className="num">{u.routesCreated}</Text>
            <Text className="lbl muted">已创建</Text>
          </View>
          <View className="stat">
            <Text className="num">{u.totalDistance}</Text>
            <Text className="lbl muted">累计距离</Text>
          </View>
          <View className="stat">
            <Text className="num">{u.spotsExplored}</Text>
            <Text className="lbl muted">探索点</Text>
          </View>
        </View>
      </View>

      <Text className="block-title">保存的路线</Text>
      <ScrollView scrollX className="saved hide-scrollbar">
        {mockRoutes.map((r) => (
          <View
            key={r.id}
            className="saved-card"
            onClick={() =>
              Taro.navigateTo({ url: `/pages/route-detail/index?id=${r.id}` })
            }
          >
            <Image className="saved-img" src={r.coverImage} mode="aspectFill" />
            <Text className="saved-name">{r.title}</Text>
            <Text className="saved-meta muted">
              {r.distance} · {r.duration}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
