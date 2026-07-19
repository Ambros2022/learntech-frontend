# ── Stage 1: Install dependencies ──
FROM node:20-alpine AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json* ./
# Force development so devDependencies (typescript, @types/node, etc.) are installed.
# NODE_ENV=production (injected by Coolify) skips devDeps and breaks the build.
ENV NODE_ENV=development
RUN npm ci --legacy-peer-deps


# ── Stage 2: Build the app ──
FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Prevent memory crash during build
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Build-time environment variables
ARG NEXT_PUBLIC_IMG_URL
ARG NEXT_PUBLIC_API_URI
ARG NEXT_PUBLIC_WEB_URL
ARG REVALIDATE_SECRET

ENV NEXT_PUBLIC_IMG_URL=$NEXT_PUBLIC_IMG_URL
ENV NEXT_PUBLIC_API_URI=$NEXT_PUBLIC_API_URI
ENV NEXT_PUBLIC_WEB_URL=$NEXT_PUBLIC_WEB_URL
ENV REVALIDATE_SECRET=$REVALIDATE_SECRET

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build


# ── Stage 3: Production runner ──
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Install wget for healthcheck
RUN apk add --no-cache wget

# Non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy build output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Fix permissions
RUN mkdir -p /app/.next/cache
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s \
CMD wget -qO- http://localhost:3000 || exit 1

CMD ["node", "server.js"]
