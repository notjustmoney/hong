FROM node:12

WORKDIR /usr/src/app

COPY ./server/package*.json ./

RUN npm install

COPY . .

EXPOSE 3030

CMD ["npm", "run", "start:dev"]
