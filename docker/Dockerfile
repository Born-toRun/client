FROM node:20-slim AS base
WORKDIR /app
RUN npm i -g pnpm
COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

# 빌드 시점에 환경변수 주입 (Jenkins에서 --build-arg로 전달)
ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}

RUN pnpm build
FROM node:20-slim AS release
WORKDIR /app
RUN npm i -g pnpm

COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/.next ./.next
COPY --from=base /app/next.config.js ./next.config.js
COPY --from=base /app/public ./public

EXPOSE 3000

CMD ["pnpm", "start"]