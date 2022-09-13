FROM node:16-alpine

WORKDIR /une-cinema-service

ADD ./package.json ./
ADD ./yarn.lock ./
ADD ./tsconfig.json ./
ADD ./.env ./
RUN yarn

CMD yarn bootstrapdb; yarn dev