FROM node:22 as builder

ARG VITE_SERVER_URL
ARG VITE_GATEWAY_URL
ARG VITE_HTTPS

RUN mkdir /site
COPY package*.json /site
WORKDIR /site
RUN npm install --force
COPY . .
RUN npm run build

FROM nginx:stable

COPY --from=builder /site/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80/tcp
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
