#build stage
FROM node:21-alpine as build
WORKDIR /ui
COPY package*.json .
RUN npm install --verbose
COPY . .

#run stage
FROM node:21-alpine
WORKDIR /ui
COPY --from=build /ui .
CMD [ "npm", "run", "dev" ]

