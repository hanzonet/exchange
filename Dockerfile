# Lux Exchange - Vite SPA Dockerfile
# Multi-stage build for production deployment

# Stage 1: Builder
FROM node:22-alpine AS builder
RUN apk add --no-cache libc6-compat python3 make g++ git
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

# Copy entire monorepo
COPY . .

# Install dependencies — run lifecycle scripts but tolerate failures
RUN NODE_ENV=development pnpm install --no-frozen-lockfile || true
# Rebuild native modules that might have failed
RUN pnpm rebuild || true

# Set build-time environment variables
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV DOCKER_BUILD=true
ENV NEXT_PUBLIC_LXD_GATEWAY_URL=https://dex.lux.network
ENV REACT_APP_LXD_GATEWAY_URL=https://dex.lux.network
ENV REACT_APP_LUX_GATEWAY_DNS=https://dex.lux.network
ENV REACT_APP_AWS_API_ENDPOINT=https://api-exchange.lux.network/v1/graphql
ENV REACT_APP_INSIGHTS_HOST=https://insights.hanzo.ai
ENV REACT_APP_INSIGHTS_API_KEY=hi_a5316882b930d11c9183007d70c3955b

# Generate gitignored types before build
# Run pnpm install (with scripts this time) in just the api package for codegen
RUN cd pkgs/api && pnpm exec openapi \
      --input ./src/clients/trading/api.json \
      --output ./src/clients/trading/__generated__ \
      --useOptions --exportServices true --exportModels true \
    || (mkdir -p src/clients/trading/__generated__/models src/clients/trading/__generated__/core src/clients/trading/__generated__/services && \
        echo 'export {}' > src/clients/trading/__generated__/index.ts)
# V3 contract types stub (no @lux artifacts in Docker)
RUN mkdir -p pkgs/lx/src/abis/types/v3 && \
    echo 'export {}' > pkgs/lx/src/abis/types/v3/index.ts
# AJV validators
RUN NODE_PATH=/app/node_modules node apps/web/scripts/compile-ajv-validators.js

# Build the web app (Vite SPA)
RUN cd apps/web && DISABLE_EXTRACTION=1 NODE_OPTIONS="--max-old-space-size=16384" pnpm exec vite build

# Stage 2: Runner — lightweight static file server
FROM node:22-alpine AS runner
RUN npm install -g serve@14
WORKDIR /app

# Copy built static assets
COPY --from=builder /app/apps/web/build /app/public

EXPOSE 3000

# serve -s enables SPA mode (all routes -> index.html)
CMD ["serve", "-s", "public", "-l", "3000"]
