FROM ubuntu:14.04

ENV DEBIAN_FRONTEND noninteractive

WORKDIR /app

COPY . .

RUN chmod +x scripts/*.sh && ./scripts/installation.sh

RUN npm install

EXPOSE 8080
CMD [ "npm", "start" ]