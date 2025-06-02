FROM node:22 AS build
COPY . /app
WORKDIR /app

# 1) Ensure build.sh is executable inside the container
RUN chmod +x /app/build.sh

# 2) Run build.sh
RUN ./build.sh
