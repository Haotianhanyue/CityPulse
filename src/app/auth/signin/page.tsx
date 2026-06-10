"use client";
import { signIn } from "next-auth/react";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

function SignInForm() {
  const [email, setEmail] = useState("dev@citypulse.app");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  async function handleCredentialLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await signIn("credentials", { email, password, callbackUrl });
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-margin-mobile">
      <Card className="w-full max-w-md p-xl">
        {/* Brand */}
        <div className="text-center mb-xl">
          <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center mx-auto mb-md">
            <Icon name="place" filled size={32} className="text-primary" />
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">
            CityPulse
          </h1>
          <p className="text-body-md font-body-md text-on-surface-variant mt-sm">
            登录后开始你的城市探索之旅
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-md p-md rounded-lg bg-error-container text-on-error-container text-caption font-caption">
            登录失败，请检查邮箱地址后重试。
          </div>
        )}

        {/* Credential Form */}
        <form onSubmit={handleCredentialLogin} className="space-y-md mb-lg">
          <div>
            <label className="text-label-md font-label-md text-on-surface block mb-xs">
              邮箱
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-md py-sm rounded-lg bg-surface-container-low border border-surface-variant text-body-md font-body-md outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <label className="text-label-md font-label-md text-on-surface block mb-xs">
              密码
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-md py-sm rounded-lg bg-surface-container-low border border-surface-variant text-body-md font-body-md outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="••••••••"
            />
          </div>
          <Button fullWidth icon="login" size="lg">
            {loading ? "登录中..." : "登录 / 注册"}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-md mb-lg">
          <div className="flex-1 h-px bg-surface-variant" />
          <span className="text-caption font-caption text-on-surface-variant">
            或使用社交账号
          </span>
          <div className="flex-1 h-px bg-surface-variant" />
        </div>

        {/* Social Login */}
        <div className="space-y-sm">
          <button
            onClick={() => signIn("github", { callbackUrl })}
            className="w-full flex items-center justify-center gap-sm px-md py-sm rounded-lg border border-surface-variant bg-surface hover:bg-surface-container-high transition-colors text-label-md font-label-md"
          >
            <Icon name="code" size={20} />
            GitHub 登录
          </button>
          <button
            onClick={() => signIn("google", { callbackUrl })}
            className="w-full flex items-center justify-center gap-sm px-md py-sm rounded-lg border border-surface-variant bg-surface hover:bg-surface-container-high transition-colors text-label-md font-label-md"
          >
            <Icon name="mail" size={20} />
            Google 登录
          </button>
        </div>

        <p className="text-center text-caption font-caption text-on-surface-variant mt-lg">
          开发阶段：输入任意邮箱即可快速登录体验
        </p>
      </Card>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">加载中...</div>}>
      <SignInForm />
    </Suspense>
  );
}
