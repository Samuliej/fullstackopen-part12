FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install

ENV VITE_BACKEND_URL http://localhost:4000

RUN npm run build

RUN npm install -g serve

USER node

CMD ["serve", "dist"]