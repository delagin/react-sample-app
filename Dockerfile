# Using latest Node.js LTS version
FROM node:8.9.4

LABEL maintainer="vtelyatnikov@axmit.com"

WORKDIR /home/node/app

# Install npm packages
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy sources
COPY *.json \
      *.config.js \
      .env* \
    ./
COPY src src

# Image settings
EXPOSE 8080
CMD [ "yarn", "start:docker" ]
