FROM node:24-alpine as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npx esbuild index.js --bundle --outfile=build/index.js --define:process.env.NODE_ENV=\"production\" --loader:.js=jsx

FROM node:24-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build ./build
COPY index.html ./build/index.html
# Add entrypoint script
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh
EXPOSE 8080
ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["serve", "-s", "build", "-l", "8080"]
