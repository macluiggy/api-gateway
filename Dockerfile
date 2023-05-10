FROM node:16-alpine3.16

WORKDIR /app

COPY package.json ./

RUN npm install

COPY ./dist ./src

EXPOSE 3000

CMD ["node", "src/main.js"]
