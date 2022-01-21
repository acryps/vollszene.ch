FROM node:12-slim

WORKDIR /usr/src/app
COPY . .

CMD [ "node", "server/dist/main.js" ]