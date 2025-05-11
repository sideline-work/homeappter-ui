# Use Node.js 14 as the base image (Angular 11 supports Node 10.x, 12.x, 14.x)
FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose the Angular development server port
EXPOSE 4200

# Command to start the Angular development server
CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]