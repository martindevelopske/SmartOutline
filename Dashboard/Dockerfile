#build stage
FROM node:21-alpine as build
WORKDIR /dashboard
COPY package*.json .
RUN npm cache clean --force
RUN npm install --verbose
COPY . .

#run stage
FROM node:21-alpine
WORKDIR /dashboard
COPY --from=build /dashboard .
CMD [ "npm", "run", "dev" ]