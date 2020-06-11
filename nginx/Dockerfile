FROM node:12 as builder

WORKDIR /usr/src/client
COPY ./client2/package*.json ./
COPY ./client2/yarn.lock ./
RUN npm install
RUN yarn install
COPY ./client2 .
RUN npm run build

FROM nginx:latest
RUN rm /etc/nginx/conf.d/default.conf
RUN mkdir /usr/share/nginx/public
RUN mkdir /usr/share/nginx/public/public
COPY --from=builder /usr/src/client/build /usr/share/nginx/html
