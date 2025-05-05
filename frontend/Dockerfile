# frontend/Dockerfile

FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the Next.js frontend
RUN npm run build

# Expose the default Next.js port
EXPOSE 3000

# Start the frontend
CMD ["npm", "run", "start"]
