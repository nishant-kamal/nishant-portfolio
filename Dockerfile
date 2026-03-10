# ─────────────────────────────────────────────────────────────────────────────
# Multi-arch image — supports: linux/amd64  linux/arm64  linux/arm/v7
#
# Build strategy:
#   - Stage 1 (builder) always runs on the BUILD host as linux/amd64.
#     `next build` is a pure JS/Node process — its output (./out) is
#     platform-independent HTML/CSS/JS, so there is no reason to cross-compile
#     it under QEMU (which is ~10× slower and risks OOM on CI runners).
#
#   - Stage 2 (production) is a tiny nginx:alpine image that Docker Buildx
#     pulls for each TARGET platform. Only this stage is emulated/cross-built,
#     and it contains no compilation — just file copies and nginx config.
#
# This gives you genuine multi-arch manifests with near-native build speed.
# ─────────────────────────────────────────────────────────────────────────────

# BUILDPLATFORM  = platform of the machine running the build  (e.g. linux/amd64)
# TARGETPLATFORM = platform of the image being produced       (e.g. linux/arm64)
ARG BUILDPLATFORM=linux/amd64
ARG TARGETPLATFORM

# ─────────────────────────────────────────────────────────────────────────────
# Stage 1 — Builder  (always native/amd64 — no QEMU slowdown)
# ─────────────────────────────────────────────────────────────────────────────
FROM --platform=${BUILDPLATFORM} node:20-alpine AS builder

WORKDIR /app

# Dependency layer — cached until package-lock.json changes
COPY package.json package-lock.json ./
RUN npm ci

# Source
COPY . .

# Produce platform-independent static export → ./out
RUN npm run build

# ─────────────────────────────────────────────────────────────────────────────
# Stage 2 — Production  (built for each TARGETPLATFORM by Buildx)
# Supported: linux/amd64 · linux/arm64 · linux/arm/v7
# Final image: ~25 MB — no Node.js, no npm, no source code
# ─────────────────────────────────────────────────────────────────────────────
FROM --platform=${TARGETPLATFORM} nginx:1.27-alpine AS production

# Remove default nginx placeholder
RUN rm -rf /usr/share/nginx/html/*

# Static site from builder stage
COPY --from=builder /app/out /usr/share/nginx/html

# Custom config: gzip · aggressive asset caching · SPA fallback · security headers
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Metadata labels (OCI standard)
ARG BUILDPLATFORM
ARG TARGETPLATFORM
LABEL org.opencontainers.image.title="nishant-portfolio" \
      org.opencontainers.image.description="Nishant Kamal — SRE Portfolio" \
      org.opencontainers.image.url="https://nishantkamal.com" \
      org.opencontainers.image.source="https://github.com/nishant-kamal/nishant-portfolio" \
      org.opencontainers.image.vendor="imnishantdevops" \
      build.platform="${BUILDPLATFORM}" \
      target.platform="${TARGETPLATFORM}"

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
