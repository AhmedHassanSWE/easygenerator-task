FROM node:18-alpine

WORKDIR /app

# (NEW) Install build tools for Alpine (required for some npm packages)
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm install

COPY . .

# (NEW) Ensure TypeScript is installed globally (for Nest.js builds)
RUN npm install -g typescript

RUN npm run build

EXPOSE 3001

# (NEW) Use "node" directly instead of "sh" for better error handling
CMD ["node", "dist/main.js"]