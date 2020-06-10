FROM node:12 as builder

WORKDIR /usr/src/client
COPY ./client2/package*.json ./
COPY ./client2/yarn.lock ./
RUN npm install
RUN yarn install
COPY ./client2 .
RUN npm run build

FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
RUN cat /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/client/build /usr/share/nginx/html
COPY ./nginx/public /usr/share/nginx/public
