/**
 * 生成 mock 数据与 PWA manifest 引用的占位图片资源。
 *
 * 项目的 mock 数据（src/data/mock.ts）与 manifest.json 引用了一批 /images、
 * /avatars、/icons 下的静态文件，但仓库里并不包含这些二进制资源，导致界面与
 * PWA 图标全部 404。此脚本用 sharp 由品牌色渐变 + 文案合成出占位图，让应用在
 * 零外部依赖下也能完整渲染，同时这些是真实栅格文件，可被 next/image 优化。
 *
 * 运行：node scripts/gen-placeholders.mjs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");

// CityPulse 品牌色
const PRIMARY = "#ab3500";
const PRIMARY_CONTAINER = "#ff6b35";
const SECONDARY = "#24619d";
const SECONDARY_CONTAINER = "#87bcfe";

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** 渐变 + 居中文案的 SVG 占位图 */
function placeholderSvg({ w, h, label, from, to, fontSize }) {
  const size = fontSize ?? Math.round(Math.min(w, h) / 8);
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <text x="50%" y="50%" fill="#ffffff" fill-opacity="0.92"
    font-family="'Segoe UI','Plus Jakarta Sans',sans-serif" font-weight="700"
    font-size="${size}" text-anchor="middle" dominant-baseline="middle">${esc(label)}</text>
</svg>`);
}

/** 圆形头像（首字母） */
function avatarSvg({ size, label, from, to }) {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#g)"/>
  <text x="50%" y="52%" fill="#ffffff" font-family="'Segoe UI',sans-serif"
    font-weight="700" font-size="${Math.round(size * 0.42)}"
    text-anchor="middle" dominant-baseline="middle">${esc(label)}</text>
</svg>`);
}

// 图片名 → 显示文案
const images = [
  ["blackstone", "黑石公寓"],
  ["fuxing-road", "复兴中路"],
  ["wukang", "武康大楼"],
  ["xuhui-cover", "徐汇漫步"],
  ["bund", "外滩"],
  ["jingan", "静安寺"],
  ["post1", "城市花园"],
  ["post2", "街角书店"],
  ["post3", "天台日落"],
  ["post4", "周末市集"],
  ["post5", "现代建筑"],
  ["coffee", "精品咖啡"],
  ["park", "城市公园"],
  ["shop", "买手小店"],
];

const palettes = [
  [PRIMARY, PRIMARY_CONTAINER],
  [SECONDARY, SECONDARY_CONTAINER],
  ["#1a1c1c", PRIMARY],
  ["#24619d", "#ab3500"],
];

async function jpg(buf, out) {
  await sharp(buf).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
}
async function png(buf, out) {
  await sharp(buf).png().toFile(out);
}

async function main() {
  await mkdir(join(pub, "images"), { recursive: true });
  await mkdir(join(pub, "avatars"), { recursive: true });
  await mkdir(join(pub, "icons"), { recursive: true });

  // 内容图（4:3 横图）
  let i = 0;
  for (const [name, label] of images) {
    const [from, to] = palettes[i % palettes.length];
    i += 1;
    await jpg(
      placeholderSvg({ w: 1200, h: 900, label, from, to }),
      join(pub, "images", `${name}.jpg`)
    );
  }

  // 头像
  await jpg(
    avatarSvg({ size: 256, label: "林", from: PRIMARY, to: PRIMARY_CONTAINER }),
    join(pub, "avatars", "user1.jpg")
  );
  await jpg(
    avatarSvg({ size: 256, label: "陈", from: SECONDARY, to: SECONDARY_CONTAINER }),
    join(pub, "avatars", "user2.jpg")
  );

  // PWA 图标
  for (const size of [192, 512]) {
    await png(
      placeholderSvg({
        w: size,
        h: size,
        label: "CP",
        from: PRIMARY,
        to: PRIMARY_CONTAINER,
        fontSize: Math.round(size * 0.34),
      }),
      join(pub, "icons", `icon-${size}.png`)
    );
  }
  // maskable：四周留白安全区
  await png(
    Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">
      <rect width="512" height="512" fill="${PRIMARY}"/>
      <text x="50%" y="52%" fill="#ffffff" font-family="'Segoe UI',sans-serif"
        font-weight="700" font-size="150" text-anchor="middle"
        dominant-baseline="middle">CP</text>
    </svg>`),
    join(pub, "icons", "icon-maskable-512.png")
  );

  const total = images.length + 2 + 3;
  console.log(`✓ 已生成 ${total} 个占位资源到 public/{images,avatars,icons}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
