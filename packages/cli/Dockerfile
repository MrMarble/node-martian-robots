FROM node:alpine as builder

RUN apk update && \
    apk add wget && \
    wget -qO - https://gobinaries.com/tj/node-prune | sh && \
    npm i -g esbuild

WORKDIR /app

COPY ./package* ./
RUN npm install

COPY ./bin.js ./
COPY src ./src

RUN esbuild src/index.js --bundle --platform=node --outfile=./dist/mrmarble-martian-robots-cli.cjs.js

# Remove development dependencies
RUN npm prune --production

# Remove leftovers from dependencies (.md, .ts, tests)
RUN node-prune

FROM node:alpine as runtime

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package* ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/bin.js ./bin.js

ENTRYPOINT ["node", "./bin.js"]
