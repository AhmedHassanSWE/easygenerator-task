FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# (NEW) Ensure Next.js is installed explicitly (avoid "sh: next: not found")
RUN npm install -g serve

RUN npm run build

EXPOSE 3000

# (NEW) Use "next start" directly (more reliable than "npm run start")
CMD ["serve", "-p", "3000", "out"]