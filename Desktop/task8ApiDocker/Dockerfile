FROM node:18.14.0
WORKDIR /app
COPY package*.json ./
COPY index.js ./
COPY views ./views
COPY public ./public
RUN npm install apollo-server-express graphql request express --save
EXPOSE 4000
CMD ["node", "index.js"]

