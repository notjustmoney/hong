FROM node:12 as builder
WORKDIR '/app'
COPY ./package.json .
RUN npm install
RUN yarn install
COPY . .
RUN npm run build
