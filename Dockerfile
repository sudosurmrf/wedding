# ─── BASE IMAGE & APT DEPENDENCIES ─────────────────────────────────────────
FROM node:22-slim

# Install all the libs headless Chrome needs
RUN apt-get update && apt-get install -y \
    gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 \
    libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 \
    libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 \
    libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 \
    libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 \
    libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 \
    libxtst6 libgbm1 ca-certificates fonts-liberation \
    libappindicator1 xdg-utils wget --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

# ─── BUILD FRONTEND ─────────────────────────────────────────────────────────
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# ─── BUILD BACKEND & COPY ASSETS ────────────────────────────────────────────
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm ci
COPY backend/ ./

# copy built frontend into a `public` dir your server will serve
COPY --from=0 /app/frontend/dist ./public

# ─── RUNTIME & LAUNCH ───────────────────────────────────────────────────────
WORKDIR /app/backend
# expose just for documentation; Railway picks up PORT anyway
EXPOSE 3000
# make sure your server reads process.env.PORT
CMD ["node", "server.js"]
