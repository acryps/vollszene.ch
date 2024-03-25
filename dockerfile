FROM ubuntu:latest

# create and run application as a non-root user
RUN groupadd -r app && useradd -r -g app -G audio,video app
RUN mkdir -p /home/app
WORKDIR /home/app

# install node
RUN apt-get update && apt-get install -y curl gnupg ca-certificates
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

# install puppeteer
RUN apt-get install -y ca-certificates fonts-liberation libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils
RUN PUPPETEER_CACHE_DIR=/home/app npm install puppeteer

# install application
COPY . .
RUN npm install
RUN cd server ; npm install ; cd ..
RUN cd page ; npm install ; cd ..
RUN cd provider ; npm install ; cd ..

# build application
RUN npm run build

# switch user
RUN chown -R app:app /home/app
ENV PUPPETEER_CACHE_DIR=/home/app
USER app

# start
WORKDIR /home/app/server
CMD [ "node", "built/index.js" ]
