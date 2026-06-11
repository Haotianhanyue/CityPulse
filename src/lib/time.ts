// ============================================================
// 时间格式化工具
// ============================================================

/** 将 Date / ISO 字符串转换为中文相对时间（如「2小时前」） */
export function relativeTime(input: Date | string | number): string {
  const date = input instanceof Date ? input : new Date(input);
  const diff = Date.now() - date.getTime();

  // 解析失败或本身已是相对描述时直接回退
  if (Number.isNaN(diff)) return typeof input === "string" ? input : "";

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) return "刚刚";
  if (diff < hour) return `${Math.floor(diff / minute)}分钟前`;
  if (diff < day) return `${Math.floor(diff / hour)}小时前`;
  if (diff < 30 * day) return `${Math.floor(diff / day)}天前`;
  return date.toLocaleDateString("zh-CN");
}
