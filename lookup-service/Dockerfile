# syntax=docker/dockerfile:1

FROM node:12.18.1

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY . .

RUN npm i

CMD [ "nodemon", "index.js" ]