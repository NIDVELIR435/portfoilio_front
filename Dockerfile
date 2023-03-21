#STAGE 1
FROM node:19-alpine

# Create app directory
WORKDIR /app

#copy package and packege-lock
COPY package*.json ./
COPY yarn.lock ./

#install yarn
RUN npm install yarn -G

#install node_modules
RUN yarn

#build app sourse
COPY . .

#create build
RUN yarn build

#STAGE 2
FROM nginx:1.23.3-alpine

WORKDIR usr/share/nginx/html
RUN rm -rf ./*

COPY --from=builder /app/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
