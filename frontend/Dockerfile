# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and pnpm lock file
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend files
COPY . .

# Expose the frontend port
EXPOSE 3000

# Command to run the frontend
CMD ["npm", "run", "dev"]
