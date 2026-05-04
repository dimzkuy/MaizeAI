# Gunakan image resmi Node.js 20 dengan Debian Bullseye sebagai base image
FROM node:20-bullseye

# Set working directory
WORKDIR /app

# Copy file yang diperlukan untuk install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy semua source code
COPY . .

# Build aplikasi Next.js dengan environment variable untuk API base URL
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

# Build aplikasi Next.js
RUN npm run build

# Jalankan aplikasi Next.js
CMD ["npm", "start"]