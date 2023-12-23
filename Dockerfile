# for linux/arm64 (macOS)
# FROM node:16-alpine
# for linux/amd64
FROM --platform=linux/amd64 node:lts-alpine
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
