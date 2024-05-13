FROM node:22

RUN mkdir /site
COPY package*.json /site
WORKDIR /site
RUN npm install
COPY . .
RUN npm run build
RUN npm install serve

CMD npm run serve
