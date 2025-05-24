FROM node:18

WORKDIR /developer/nodejs/booking-service

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3003

CMD ["npm", "run", "dev"]


#docker build -t api-gateway .

# docker run -it --init --name booking_service --network microservice `
#   -p 4003:3003 `
#   -v "${PWD}:/developer/nodejs/booking-service" `
#   -v booking-service-node-modules:/developer/nodejs/booking-service/node_modules `
#   booking-service:latest