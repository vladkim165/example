FROM node:16.14-alpine

RUN apk add --update \
  python3 \
  build-base \
  gcc \
  zlib-dev \
  libpng-dev

WORKDIR /src

COPY ./src/package.json ./src/yarn.lock ./

RUN yarn install

COPY ./src .

CMD ["sh", "-c", "yarn build && yarn start"]
