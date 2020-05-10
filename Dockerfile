FROM node:12 as builder
WORKDIR /
COPY . .
RUN npm ci && npm run build

FROM nginx:alpine

COPY --from=builder dist/ /usr/share/nginx/html/