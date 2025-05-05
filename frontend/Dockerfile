FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# (NEW) Ensure Next.js is installed explicitly (avoid "sh: next: not found")
RUN npm install next

RUN npm run build

EXPOSE 80

# (NEW) Use "next start" directly (more reliable than "npm run start")
CMD ["npx", "next", "start"]