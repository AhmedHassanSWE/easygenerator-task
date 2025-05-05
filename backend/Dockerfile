# backend/Dockerfile

FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the backend code
COPY . .

# Build the backend (if you're using TypeScript)
RUN npm run build

# Expose port (optional, depending on your app)
EXPOSE 4000

# Start the app
CMD ["node", "dist/main.js"]
