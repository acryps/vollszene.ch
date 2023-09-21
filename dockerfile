FROM node:18-slim

WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN cd server ; npm install ; cd ..
RUN cd page ; npm install ; cd ..
RUN cd provider ; npm install ; cd ..

RUN npm run build

WORKDIR /usr/src/app/server
CMD [ "node", "built/index.js" ]