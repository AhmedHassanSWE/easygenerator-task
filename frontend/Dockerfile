FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
# Add this line to install type definitions
RUN npm install --save-dev @types/js-cookie

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npx", "next", "start"]