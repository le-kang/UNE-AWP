FROM node:16-alpine

WORKDIR /une-cinema-typescript

RUN apk add --update python3 make g++

ADD ./package.json ./
ADD ./yarn.lock ./
RUN yarn

ADD ./src ./src

CMD yarn start