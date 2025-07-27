FROM node:24-alpine
WORKDIR /usr/src/app
# Copy both package.json and package-lock.json if present
COPY package*.json ./
# Install all dependencies (including express and cors)
RUN npm install --production
COPY index.js ./
EXPOSE 3000
CMD ["node", "index.js"]
