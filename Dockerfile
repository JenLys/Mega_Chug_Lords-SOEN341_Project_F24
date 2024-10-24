FROM node:20-alpine
WORKDIR /reviewmate
COPY ./package*.json .
COPY ./client ./client
COPY ./server ./server
EXPOSE 5050
EXPOSE 4173
RUN ls
RUN npm run install:all
CMD [ "npm", "run", "prod" ]