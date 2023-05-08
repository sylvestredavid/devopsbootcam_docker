FROM node:14.18-alpine as builder
COPY package.json ./
RUN npm install && mkdir /app && cp -R ./node_modules ./app
WORKDIR /app
COPY . .
RUN npm run build

FROM nginx:1.15.2-alpine as prod
COPY nginx/default.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
