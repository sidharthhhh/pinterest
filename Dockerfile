
# Use the official Node.js image
FROM node:latest

# Copy the application files into the container
COPY . /home/app

# Set the working directory
WORKDIR /home/app/

# Install application dependencies
RUN npm install

# Expose the application port
EXPOSE 3000

# Run the Node.js application
CMD ["node", "app"]
