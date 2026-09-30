# ビルドコンテキストはリポジトリ直下:
#   docker build -f frontend/Dockerfile --build-arg API_URL=... .
# Vercel にデプロイする場合は使わない。自前ホスティング用。

FROM oven/bun:1.3-alpine AS deps
WORKDIR /app
COPY package.json bun.lock turbo.json ./
COPY frontend/package.json ./frontend/
COPY backend/package.json ./backend/
RUN bun install --frozen-lockfile --filter frontend

FROM oven/bun:1.3-alpine AS builder
WORKDIR /app
ARG API_URL
ARG NEXT_PUBLIC_SITE_URL=https://enje.dev
ENV API_URL=$API_URL \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_TELEMETRY_DISABLED=1
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
