"use client";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { Icon } from "@/components/ui/Icon";
import { getAchievements } from "@/lib/achievements";
import type { UserProfile } from "@/types";

/** 成就墙：把 UserProfile 的成长数字转成可视化勋章（已解锁高亮 / 进行中显进度） */
export function AchievementWall({ user }: { user: UserProfile }) {
  const achievements = getAchievements(user);
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <section className="mb-xl">
      <div className="flex items-center justify-between mb-md">
        <h2 className="font-headline-lg text-headline-md text-on-surface">
          我的成就
        </h2>
        <span className="text-caption font-caption text-on-surface-variant">
          {unlockedCount}/{achievements.length} 已解锁
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
        {achievements.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className={clsx(
              "p-md rounded-xl border flex flex-col items-center text-center gap-xs",
              a.unlocked
                ? "bg-primary-container/10 border-primary/30"
                : "bg-surface-container-low border-surface-variant opacity-70",
            )}
          >
            <div
              className={clsx(
                "w-12 h-12 rounded-full flex items-center justify-center",
                a.unlocked
                  ? "bg-primary text-on-primary"
                  : "bg-surface-variant text-on-surface-variant",
              )}
            >
              <Icon name={a.unlocked ? a.icon : "lock"} size={24} filled={a.unlocked} />
            </div>
            <p className="text-label-md font-label-md text-on-surface">
              {a.name}
            </p>
            <p className="text-caption font-caption text-on-surface-variant">
              {a.description}
            </p>
            {!a.unlocked && (
              <div className="w-full mt-xs">
                <div className="w-full h-1 bg-surface-variant rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary/60 rounded-full transition-all duration-700"
                    style={{ width: `${a.progress * 100}%` }}
                  />
                </div>
                <p className="text-caption font-caption text-on-surface-variant mt-xs">
                  {a.remainingText}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
