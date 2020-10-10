FROM node:current-alpine
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run test

RUN npm run copyfiles

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

ENTRYPOINT npm run start
