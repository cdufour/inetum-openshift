FROM nodejs:16-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY server.js .
RUN ["node", "server.js"]
