FROM node:12 as builder
MAINTAINER chajy97@gmail.com

WORKDIR /usr/src/server
COPY ./package*.json .
RUN npm install
COPY . .
CMD ["npm", "run", "start:dev"]

