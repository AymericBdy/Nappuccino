FROM node:17-alpine as static

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Generate files for web server
RUN npx vite build

############

FROM nginx:latest as webserver
# Copy the files to the webserver
COPY --from=static /usr/src/app/dist/assets /usr/share/nginx/html/assets
COPY --from=static /usr/src/app/dist/example/simple-map-2.html /usr/share/nginx/html/index.html
# And add the maps
COPY example/maps/ /usr/share/nginx/html/maps/

EXPOSE 80
