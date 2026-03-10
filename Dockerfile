ARG BUILDPLATFORM=linux/amd64
ARG TARGETPLATFORM
FROM --platform=${BUILDPLATFORM} node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
# ─────────────────────────────────────────────────────────────────────────────
# Stage 2 — Production  (built for each TARGETPLATFORM by Buildx)
# Supported: linux/amd64 · linux/arm64 · linux/arm/v7
# Final image: ~25 MB — no Node.js, no npm, no source code
# ─────────────────────────────────────────────────────────────────────────────
FROM --platform=${TARGETPLATFORM} nginx:1.27-alpine AS production
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
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
