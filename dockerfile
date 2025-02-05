FROM node:20-slim

# create and run application as a non-root user
RUN apt-get update && apt-get install -y git freecad chromium
RUN which chromium

WORKDIR /home/app
COPY . .

# install dependencies
COPY . .
RUN npm install
RUN cd server ; npm install ; cd ..
RUN cd page ; npm install ; cd ..

# build application
RUN npm run build

# start
WORKDIR /home/app/server
CMD [ "node", "built/index.js" ]
