# CityPulse Next.js 14 + Prisma 部署镜像（ops demo）
FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache openssl libc6-compat
COPY package.json package-lock.json ./
# 跳过 postinstall（此时 prisma schema 尚未拷入）
RUN npm ci --ignore-scripts
COPY . .
# 拷入源码后再生成 Prisma Client
RUN npx prisma generate
ENV DATABASE_URL="postgresql://build:build@localhost:5432/build?schema=public"
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
EXPOSE 3000
CMD ["npm", "run", "start"]
