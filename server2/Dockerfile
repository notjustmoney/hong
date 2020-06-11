FROM node:12 as builder
LABEL maintainer chajy97@gmail.com

WORKDIR /usr/src/server
COPY ./package*.json ./
RUN npm install
RUN touch .env
COPY . .
CMD ["npm", "run", "start:dev"]

