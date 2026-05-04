FROM node:20-bullseye

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .


ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

RUN npm run build

CMD ["npm", "start"]