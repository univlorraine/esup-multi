ARG NODE_VERSION
ARG DIST_DIR=./dist

FROM node:$NODE_VERSION

ARG DIST_DIR
ENV NODE_ENV="production"

RUN mkdir -p /usr/app

COPY ${DIST_DIR} /usr/app/dist
COPY ./node_modules /usr/app/node_modules

RUN chown -R node:node /usr/app
USER node

WORKDIR /usr/app/dist
CMD ["node", "main.js"]
