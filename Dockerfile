#STAGE 1
FROM node:19-alpine

# Create app directory
WORKDIR /app

#copy package and packege-lock
COPY package*.json ./
COPY yarn.lock ./

#install yarn
RUN npm install yarn -G

RUN yarn install --frozen-lockfile

EXPOSE 3000

#install node_modules
RUN yarn

#build app sourse
COPY . .

#create build
RUN yarn build

CMD ["yarn", "start"]
