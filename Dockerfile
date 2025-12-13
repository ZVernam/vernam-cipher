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

LABEL maintainer="Evgenii Shchepotev" \
      description="Vernam cipher JS implementation" \
      version="0.6.0"

# Copy built artifacts from builder stage to nginx html directory
COPY --from=builder /app/telegram/dist /usr/share/nginx/html
RUN sed -i "s|__SERVER_API__|$SERVER_API|g" /usr/share/nginx/html/index.html

# Expose nginx port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
