# Use Node.js 18 as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Create a placeholder env file for build (will be replaced at runtime)
RUN echo "GEMINI_API_KEY=placeholder" > .env.local

# Build the application
RUN npm run build

# Install a simple HTTP server to serve the built files
RUN npm install -g serve

# Remove the placeholder env file
RUN rm .env.local

# Expose port 5000
EXPOSE 5000

# Create a startup script that injects the API key at runtime
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'if [ -z "$GEMINI_API_KEY" ]; then' >> /app/start.sh && \
    echo '  echo "Error: GEMINI_API_KEY environment variable is required"' >> /app/start.sh && \
    echo '  exit 1' >> /app/start.sh && \
    echo 'fi' >> /app/start.sh && \
    echo 'sed -i "s/placeholder/$GEMINI_API_KEY/g" /app/dist/assets/*.js 2>/dev/null || true' >> /app/start.sh && \
    echo 'serve -s dist -l 5000' >> /app/start.sh && \
    chmod +x /app/start.sh

# Start the application
CMD ["/app/start.sh"]
