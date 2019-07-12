FROM ubuntu:14.04

ENV DEBIAN_FRONTEND noninteractive

WORKDIR /app

COPY scripts/*.sh ./scripts/

RUN chmod +x scripts/*.sh && \
    ./scripts/installation.sh

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]