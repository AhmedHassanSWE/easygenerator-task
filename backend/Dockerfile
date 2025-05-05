# backend/Dockerfile

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

# Load environment variables and run the app
CMD ["sh", "-c", "node dist/main.js"]
