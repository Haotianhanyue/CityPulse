// ============================================================
// Cloudinary 图片上传（unsigned preset）
// ------------------------------------------------------------
// 需要 CLOUDINARY_CLOUD_NAME + CLOUDINARY_UPLOAD_PRESET。
// 未配置时返回 null，由路由返回 501 提示。
// ============================================================
const CLOUD = process.env.CLOUDINARY_CLOUD_NAME;
const PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;

export function isCloudinaryConfigured(): boolean {
  return Boolean(CLOUD && PRESET);
}

export interface UploadResult {
  url: string;
  width?: number;
  height?: number;
}

export async function uploadImage(file: File): Promise<UploadResult | null> {
  if (!isCloudinaryConfigured()) return null;
  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", PRESET!);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`,
    { method: "POST", body: form },
  );
  if (!res.ok) return null;
  const json = await res.json();
  return { url: json.secure_url, width: json.width, height: json.height };
}
