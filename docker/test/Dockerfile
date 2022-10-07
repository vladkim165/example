FROM node:14.17-alpine

WORKDIR /src

COPY ./src/package.json ./src/yarn.lock ./

RUN yarn install

COPY ./src .
COPY ./docker/test/env ./env

ARG ENV_FILE

RUN export $(cat ./env/${ENV_FILE} | grep -v "#" | xargs) && yarn build

CMD yarn start
