ARG NODE_VERSION

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV="production"

RUN mkdir -p /usr/app

COPY ./dist /usr/app/dist
COPY ./node_modules /usr/app/node_modules

RUN chown -R node:node /usr/app
USER node

WORKDIR /usr/app/dist
CMD ["node", "main.js"]
