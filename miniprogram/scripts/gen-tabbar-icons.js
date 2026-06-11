// 生成 tabBar 图标 PNG（Material 图标路径 → 灰/橙两色，81x81）。
// 依赖 sharp（仅生成时需要）。运行：node scripts/gen-tabbar-icons.js
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ICONS = {
  // 探索（map）
  explore:
    "M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z",
  // 路线（directions_walk）
  routes:
    "M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7",
  // 社区（forum）
  community:
    "M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z",
  // 我的（person）
  profile:
    "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
};
const COLORS = { "": "#594139", "-active": "#ab3500" }; // 普通态 / 选中态

const outDir = path.join(__dirname, "..", "src", "assets", "tabbar");
fs.mkdirSync(outDir, { recursive: true });

(async () => {
  for (const [name, d] of Object.entries(ICONS)) {
    for (const [suffix, color] of Object.entries(COLORS)) {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="81" height="81" viewBox="0 0 24 24"><path fill="${color}" d="${d}"/></svg>`;
      const out = path.join(outDir, `${name}${suffix}.png`);
      await sharp(Buffer.from(svg)).png().toFile(out);
      console.log("wrote", path.relative(process.cwd(), out));
    }
  }
  console.log("done");
})();
