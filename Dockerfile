# Stage 1: Build Image
FROM node:18-alpine as build


WORKDIR /app

COPY package*.json ./

RUN npm ci --ignore-scripts

COPY . .

RUN npm run build

# Stage 2, use the compiled app, ready for production with Nginx
FROM nginx:1.21.6-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf
COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh