FROM node:20-bullseye

# install python
RUN apt-get update && apt-get install -y python3 python3-pip

WORKDIR /app

# copy semua
COPY . .

# install backend deps
RUN pip3 install --no-cache-dir -r backend/requirements.txt

# install frontend deps
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# balik ke root
WORKDIR /app

# copy start script
COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 8080

CMD ["/start.sh"]