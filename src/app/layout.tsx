import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { TopNav } from "@/components/layout/TopNav";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SocketProvider } from "@/components/SocketProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { InstallPrompt } from "@/components/InstallPrompt";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CityPulse · 发现城市中的隐藏宝藏",
  description:
    "CityPulse 是一款面向城市探索爱好者的移动优先 Web 应用，帮助用户发现、规划和分享城市漫步路线。",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#ab3500",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh-CN"
      className={`${inter.variable} ${jakarta.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background text-on-surface">
        <AuthProvider>
          <ThemeProvider>
            <SocketProvider>
              <Sidebar />
              <div className="md:ml-64 min-h-screen pb-20 md:pb-0">
                <TopNav />
                <main>{children}</main>
              </div>
              <BottomNav />
              <InstallPrompt />
            </SocketProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
