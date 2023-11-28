#build stage
FROM node:21-alpine as build
WORKDIR /api
COPY package*.json .
RUN npm install
COPY . .

#run stage
FROM node:21-alpine
WORKDIR /api
COPY --from=build /api .
CMD [ "npm", "run", "dev" ]