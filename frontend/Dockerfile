FROM node:18-alpine as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npx esbuild index.js --bundle --outfile=build/index.js --define:process.env.NODE_ENV=\"production\"

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build ./build
COPY index.html ./build/index.html
EXPOSE 5000
CMD ["serve", "-s", "build", "-l", "5000"]
