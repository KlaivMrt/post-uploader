FROM node:18

WORKDIR /api

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5000

# RUN node server.js

CMD ["npm", "run", "dev"]
