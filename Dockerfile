# Build stage
FROM node:8-alpine AS builder

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
RUN npm run build

# Production stage
FROM nginx:alpine

LABEL maintainer="Evgenii Shchepotev" \
      description="Vernam cipher JS implementation" \
      version="0.4.1"

# Copy built artifacts from builder stage to nginx html directory
COPY --from=builder /app/build/web /usr/share/nginx/html

# Expose nginx port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
