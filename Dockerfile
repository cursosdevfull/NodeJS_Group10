#Carpeta Deployment
FROM node:alpine3.16 AS DEPLOYMENT

RUN apk add curl bash --no-cache

RUN curl -sf https://gobinaries.com/tj/node-prune | sh -s -- -b /usr/local/bin

WORKDIR /build

COPY package.json . 

RUN npm install

COPY . . 

RUN npm run build

RUN npm prune

RUN /usr/local/bin/node-prune

#Carpeta Production
FROM node:alpine3.16

WORKDIR /app

COPY --from=DEPLOYMENT /build/node_modules ./node_modules

COPY --from=DEPLOYMENT /build/package.json ./package.json

COPY --from=DEPLOYMENT /build/dist ./dist

CMD ["npm", "run", "prod"]