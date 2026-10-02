# ビルドコンテキストはリポジトリ直下:
#   docker build -f frontend/Dockerfile --build-arg API_URL=... --build-arg REVALIDATE_SECRET=... .
# 実行時も同じ値を渡す（ISR と再検証ルートが使う）:
#   docker run -e API_URL=... -e NEXT_PUBLIC_SITE_URL=... -e REVALIDATE_SECRET=... enje-frontend
# Vercel にデプロイする場合は使わない。自前ホスティング用。

FROM oven/bun:1.3-alpine AS deps
WORKDIR /app
COPY package.json bun.lock turbo.json ./
COPY frontend/package.json ./frontend/
COPY backend/package.json ./backend/
RUN bun install --frozen-lockfile --filter frontend

FROM oven/bun:1.3-alpine AS builder
WORKDIR /app
# next build は Node で動かす（node が無いと bun が代わりに動き、musl 上で終了時に落ちる）
RUN apk add --no-cache nodejs
ARG API_URL
ARG NEXT_PUBLIC_SITE_URL=https://enje.dev
ARG REVALIDATE_SECRET
ENV API_URL=$API_URL \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    REVALIDATE_SECRET=$REVALIDATE_SECRET \
    NEXT_TELEMETRY_DISABLED=1
# bun の依存は /app/node_modules/.bun への symlink なので、lockfile を置いて
# Next.js のワークスペースルートを /app にする（無いと /app/frontend になり next を解決できない）
COPY package.json bun.lock ./
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/frontend/node_modules ./frontend/node_modules
COPY frontend ./frontend
RUN cd frontend && bun run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/frontend/.next/static ./frontend/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/frontend/public ./frontend/public
USER nextjs
EXPOSE 3000
CMD ["node", "frontend/server.js"]
