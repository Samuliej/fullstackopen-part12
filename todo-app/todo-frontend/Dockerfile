FROM node:20 AS base
WORKDIR /usr/src/app

FROM base AS build-stage
COPY --chown=node:node . .
RUN npm ci
ENV VITE_BACKEND_URL http://localhost:4000
RUN npm run build

FROM base AS production-stage
RUN npm install -g serve
COPY --from=build-stage /usr/src/app/dist ./dist
USER node
CMD ["serve", "dist"]

FROM base AS test
COPY --chown=node:node . .
RUN npm ci
RUN npm run test