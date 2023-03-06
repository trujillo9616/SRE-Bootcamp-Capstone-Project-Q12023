FROM node:18.13.0-alpine3.17

RUN apk update && apk add openssl1.1-compat

WORKDIR /app
COPY package*.json ./
RUN yarn install && yarn add typescript@4.9.5
COPY prisma ./prisma
COPY . .

RUN yarn build
RUN npx prisma generate

EXPOSE 8000

CMD ["yarn", "start"]