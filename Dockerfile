FROM node:18-alpine
WORKDIR /node-api
COPY ./package.json /node-api

RUN npm install
COPY . .

EXPOSE 4000
CMD ["node","app.js"]