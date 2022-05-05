FROM node:lts-alpine
ENV NODE_ENV=production
ENV CHROME_PATH = /usr/bin/google-chrome
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN yarn global add lighthouse && npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3031
RUN chown -R node /usr/src/app
USER node
RUN which google-chrome

CMD ["npm", "start"]
