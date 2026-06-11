import { useState, useEffect } from "react";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import { fetchFeed } from "@/services/request";
import type { Post } from "@/types";
import "./index.scss";

const tabs = [
  { label: "热门", filter: "trending" },
  { label: "关注", filter: "following" },
  { label: "附近", filter: "nearby" },
];

const typeClass: Record<string, string> = {
  精选路线: "cat-blue",
  隐藏宝藏: "cat-green",
  拍照圣地: "cat-purple",
  热门活动: "cat-orange",
  建筑美学: "cat-sky",
};

export default function Community() {
  const [filter, setFilter] = useState("trending");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [online, setOnline] = useState(1286);

  useEffect(() => {
    setLoading(true);
    fetchFeed({ filter }).then((res) => {
      setPosts(res.data);
      setLoading(false);
    });
  }, [filter]);

  useEffect(() => {
    const t = setInterval(
      () => setOnline((o) => Math.max(800, o + Math.floor(Math.random() * 21) - 10)),
      5000,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <View className="page-container">
      <View className="header">
        <Text className="section-title">社区动态</Text>
        <View className="online">
          <View className="dot" />
          <Text className="online-text">{online.toLocaleString()} 人在线</Text>
        </View>
      </View>
      <Text className="page-sub muted">发现城市探索者的精彩分享</Text>

      <ScrollView scrollX className="chips hide-scrollbar">
        {tabs.map((t) => (
          <Text
            key={t.filter}
            className={`chip ${filter === t.filter ? "chip-active" : ""}`}
            onClick={() => setFilter(t.filter)}
          >
            {t.label}
          </Text>
        ))}
      </ScrollView>

      {loading ? (
        <Text className="muted state">加载中...</Text>
      ) : (
        posts.map((post) => (
          <View key={post.id} className="feed-card">
            {post.images[0] && (
              <Image className="cover" src={post.images[0]} mode="aspectFill" />
            )}
            <View className="body">
              <Text className={`badge ${typeClass[post.type]}`}>{post.type}</Text>
              <Text className="title">{post.title}</Text>
              <View className="footer">
                <View className="author">
                  <Image className="avatar" src={post.author.avatar} mode="aspectFill" />
                  <Text className="author-name">{post.author.name}</Text>
                </View>
                <View className="stats">
                  <Text className="stat">♥ {post.likes}</Text>
                  <Text className="stat">💬 {post.comments}</Text>
                </View>
              </View>
            </View>
          </View>
        ))
      )}
    </View>
  );
}
