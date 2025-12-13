ARG VERSION="0.6.4"

# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package definitions first to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Run tests
RUN npm test

# Build the application
RUN npm run build:telegram

# Production stage
FROM nginx:alpine

ENV VERSION="$VERSION"

LABEL maintainer="Evgenii Shchepotev" \
      description="Vernam cipher JS implementation" \
      version="$VERSION"

# Copy built artifacts from builder stage to nginx html directory
COPY --from=builder /app/telegram/dist /usr/share/nginx/html

# Copy entrypoint script
COPY .docker/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Switch to non-root user for security
USER nginx

ENTRYPOINT ["/docker-entrypoint.sh"]

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
