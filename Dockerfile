FROM node:18-alpine
WORKDIR /nodeapi
COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 4000
CMD ["node","app.js"]