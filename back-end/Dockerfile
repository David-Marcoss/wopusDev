FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env 

RUN npm run build

EXPOSE 3333

CMD ["npm", "run", "docker"]