# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.5.1
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="NodeJS"

# NodeJS app lives here
RUN mkdir /app
WORKDIR /app

COPY . .

# Set production environment
ENV NODE_ENV=production


# Throw-away build stage to reduce size of final image
# FROM base as build

# Install packages needed to build node modules
# RUN apt-get update -qq && \
#     apt-get install -y python-is-python3 pkg-config build-essential 

# Specifically this:
RUN apt-get update -qq && \
    apt-get install -y openssl

# ARG YARN_VERSION=1.22.19
# RUN npm --global install yarn

# Install node modules
# COPY package.json ./
# COPY yarn.lock ./
RUN yarn

# Copy application code
# COPY . .

# Build application
RUN npx turbo run build --filter server
RUN ls
# Remove development dependencies
# RUN pnpm prune --production


# Final stage for app image
# FROM base

# Copy built application
# COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
# CMD ["echo ls" ]
CMD ["ls"]
CMD ["yarn", "start"]

