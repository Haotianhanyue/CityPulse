"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useToast } from "@/components/ui/Toast";
import { createRoute } from "@/lib/api-client";

const CATEGORIES = ["城市漫步", "夜骑", "文化探访", "美食之旅"] as const;
const DIFFICULTIES = ["轻松", "中等", "挑战"] as const;

interface StopDraft {
  name: string;
  time: string;
  description: string;
}

const inputCls =
  "w-full p-md rounded-xl bg-surface-container-low outline-none focus:ring-2 focus:ring-primary/40 text-body-md font-body-md transition-shadow";

export default function NewRoutePage() {
  const router = useRouter();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] =
    useState<(typeof CATEGORIES)[number]>("城市漫步");
  const [location, setLocation] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [difficulty, setDifficulty] =
    useState<(typeof DIFFICULTIES)[number]>("轻松");
  const [stops, setStops] = useState<StopDraft[]>([
    { name: "", time: "", description: "" },
  ]);
  const [submitting, setSubmitting] = useState(false);

  const updateStop = (i: number, patch: Partial<StopDraft>) =>
    setStops((prev) => prev.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  const addStop = () =>
    setStops((prev) => [...prev, { name: "", time: "", description: "" }]);
  const removeStop = (i: number) =>
    setStops((prev) => prev.filter((_, idx) => idx !== i));

  const submit = async () => {
    if (!title.trim()) return toast("请填写路线标题", "error");
    if (!location.trim()) return toast("请填写地点", "error");
    if (!distance.trim() || !duration.trim())
      return toast("请填写距离与时长", "error");

    setSubmitting(true);
    try {
      const filledStops = stops
        .filter((s) => s.name.trim())
        .map((s, idx) => ({
          order: idx + 1,
          name: s.name,
          time: s.time,
          description: s.description,
          images: [] as string[],
        }));

      const route = await createRoute({
        title,
        subtitle,
        category,
        location,
        distance,
        duration,
        difficulty,
        stops: filledStops.length ? filledStops : undefined,
      });
      toast("路线已创建 🎉", "success");
      router.push(`/routes/${route.id}`);
    } catch (e) {
      toast(e instanceof Error ? e.message : "创建失败，请稍后再试", "error");
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-margin-mobile md:px-margin-desktop py-lg pb-2xl">
      <h1 className="font-headline-lg text-display-lg text-on-surface mb-lg">
        新建路线
      </h1>

      <Card className="p-lg space-y-md mb-lg">
        <div>
          <label className="text-label-md font-label-md text-on-surface mb-xs block">
            路线标题 *
          </label>
          <input
            className={inputCls}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="如：徐汇周日漫步：梧桐树下的老洋房"
          />
        </div>

        <div>
          <label className="text-label-md font-label-md text-on-surface mb-xs block">
            副标题
          </label>
          <input
            className={inputCls}
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="一句话描述这条路线"
          />
        </div>

        <div className="grid grid-cols-2 gap-md">
          <div>
            <label className="text-label-md font-label-md text-on-surface mb-xs block">
              分类
            </label>
            <select
              className={inputCls}
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as (typeof CATEGORIES)[number])
              }
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-label-md font-label-md text-on-surface mb-xs block">
              难度
            </label>
            <select
              className={inputCls}
              value={difficulty}
              onChange={(e) =>
                setDifficulty(e.target.value as (typeof DIFFICULTIES)[number])
              }
            >
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-label-md font-label-md text-on-surface mb-xs block">
            地点 *
          </label>
          <input
            className={inputCls}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="如：上海 · 徐汇区"
          />
        </div>

        <div className="grid grid-cols-2 gap-md">
          <div>
            <label className="text-label-md font-label-md text-on-surface mb-xs block">
              距离 *
            </label>
            <input
              className={inputCls}
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="如：3.2km"
            />
          </div>
          <div>
            <label className="text-label-md font-label-md text-on-surface mb-xs block">
              时长 *
            </label>
            <input
              className={inputCls}
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="如：2.5h"
            />
          </div>
        </div>
      </Card>

      {/* Stops */}
      <div className="flex items-center justify-between mb-md">
        <h2 className="font-headline-lg text-headline-md text-on-surface">
          路线站点
        </h2>
        <Button icon="add" variant="ghost" size="sm" onClick={addStop}>
          添加站点
        </Button>
      </div>

      <div className="space-y-md mb-lg">
        {stops.map((stop, i) => (
          <Card key={i} className="p-md space-y-sm">
            <div className="flex items-center justify-between">
              <span className="text-label-md font-label-md text-primary">
                站点 {i + 1}
              </span>
              {stops.length > 1 && (
                <button
                  onClick={() => removeStop(i)}
                  className="text-on-surface-variant hover:text-error"
                  aria-label="删除站点"
                >
                  <Icon name="delete" size={18} />
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-sm">
              <input
                className={inputCls}
                value={stop.name}
                onChange={(e) => updateStop(i, { name: e.target.value })}
                placeholder="站点名称"
              />
              <input
                className={inputCls}
                value={stop.time}
                onChange={(e) => updateStop(i, { time: e.target.value })}
                placeholder="时间，如 10:00 AM"
              />
            </div>
            <textarea
              className={`${inputCls} resize-none h-16`}
              value={stop.description}
              onChange={(e) => updateStop(i, { description: e.target.value })}
              placeholder="这一站有什么值得看的？"
            />
          </Card>
        ))}
      </div>

      <Button fullWidth onClick={submit} disabled={submitting}>
        {submitting ? "提交中…" : "发布路线"}
      </Button>
      <p className="text-caption font-caption text-on-surface-variant text-center mt-sm">
        提示：演示模式（无数据库）下创建会返回提示且不落库，需登录 + 数据库支持。
      </p>
    </div>
  );
}
