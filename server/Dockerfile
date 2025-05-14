# server/Dockerfile  – Alpine + build‑from‑source
FROM node:18-alpine

# ⬅  build chain for native addons
RUN apk add --no-cache python3 make g++

WORKDIR /app
COPY server/package*.json ./

# ⬅  חובה: מאלץ קומפילציה מקומית לבקריפט
ENV npm_config_build_from_source=true \
    npm_config_cache=/tmp/.npm-cache     \
    npm_config_update_notifier=false

# התקנה רק לתלויות production
RUN npm ci --omit=dev --no-audit --no-fund

COPY server/ .
EXPOSE 3001
CMD ["node", "index.js"]
