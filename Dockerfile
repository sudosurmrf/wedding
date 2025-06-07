# ─── STAGE 1: Build Front-End ─────────────────────────────────────────────────
FROM node:22-slim AS frontend-builder
WORKDIR /app/frontend

# install & build your Vite app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build        # outputs /app/frontend/dist

# ─── STAGE 2: Build Back-End & Bundle Assets ─────────────────────────────────
FROM node:22-slim AS backend-builder
WORKDIR /app/backend

# install back-end deps
COPY backend/package.json backend/package-lock.json ./
RUN npm ci

# copy back-end code
COPY backend/ ./

# pull in the compiled front-end
COPY --from=frontend-builder /app/frontend/dist ./public

# ─── STAGE 3: Runtime Image with Puppeteer Deps ───────────────────────────────
FROM node:22-slim AS runtime
WORKDIR /app/backend

#  Install OS libs *and* a chromium binary
RUN apt-get update && apt-get install -y \
    chromium \
    gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 \
    libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 \
    libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 \
    libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 \
    libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 \
    libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 \
    libxtst6 libgbm1 ca-certificates fonts-liberation \
    libappindicator1 xdg-utils wget --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

# bring in everything from the backend-builder (which includes your public/)
COPY --from=backend-builder /app/backend ./

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# document the port; your code should listen on process.env.PORT
EXPOSE 3000

# start your server
CMD ["node", "server.js"]
