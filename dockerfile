FROM node:alpine AS build-env

WORKDIR /app

COPY . ./timezone-buddy

WORKDIR /app/timezone-buddy

RUN npm install

RUN npm run build

FROM nginx:alpine

WORKDIR /app

COPY --from=build-env /app/static ./static

COPY ./Build/nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080