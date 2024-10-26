# Use an official Node.js runtime as a base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json from the root to the container's working directory
COPY ../package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the server directory code into the container
COPY . .

# Expose the port the app will run on
EXPOSE 8000

# Start the server
CMD ["nodemon", "server.js"]

