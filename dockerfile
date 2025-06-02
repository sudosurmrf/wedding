COPY . /app
WORKDIR /app

# 1) Ensure build.sh is executable inside the container
RUN chmod +x /app/build.sh

# 2) Run build.sh (it already cds into frontend/backend internally)
RUN --mount=type=cache,id=node-modules-cache,target=/app/node_modules/.cache \
    ./build.sh
