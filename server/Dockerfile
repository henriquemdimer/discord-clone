FROM node:22

RUN mkdir /app
COPY package*.json /app
WORKDIR /app
RUN npm install
COPY . .
RUN npm run build

CMD npm start
