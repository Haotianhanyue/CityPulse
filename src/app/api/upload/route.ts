import { NextResponse, NextRequest } from "next/server";
import { uploadImage, isCloudinaryConfigured } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

// POST /api/upload - 图片上传（Cloudinary）
export async function POST(request: NextRequest) {
  if (!isCloudinaryConfigured()) {
    return NextResponse.json(
      { error: "图片上传未配置（需 Cloudinary）", configured: false },
      { status: 501 },
    );
  }
  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "缺少文件" }, { status: 400 });
    }
    const result = await uploadImage(file);
    if (!result) {
      return NextResponse.json({ error: "上传失败" }, { status: 502 });
    }
    return NextResponse.json({ data: result });
  } catch {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}
