# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json only (no need for pnpm-lock.yaml)
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend files
COPY . .

# Expose the backend port
EXPOSE 3000

# Command to run the backend
CMD ["node", "server.js"]
