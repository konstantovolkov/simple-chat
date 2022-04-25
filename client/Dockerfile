FROM node:16.14.2-alpine
WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci --production
ENV NODE_ENV=production
COPY . ./
RUN npm run build

CMD ["node", "index.js"]