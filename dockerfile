FROM node:12-slim

WORKDIR /app
COPY . .

CMD [ "npm", "start" ]