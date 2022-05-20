FROM node:18-alpine

WORKDIR /pruebaTecnica
COPY package.json .
RUN npm install
COPY . .
CMD npm start