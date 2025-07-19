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

# Build the application
RUN npm run build

# Install a simple HTTP server to serve the built files
RUN npm install -g serve

# Expose port 5000
EXPOSE 5000

# Start the application directly
CMD ["serve", "-s", "dist", "-l", "5000"]
