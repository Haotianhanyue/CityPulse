export { default } from "next-auth/middleware";

export const config = {
  // 受保护路由（需要登录）
  matcher: ["/profile/:path*", "/routes/new"],
};
