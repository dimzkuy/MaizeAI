#!/bin/bash

echo "Starting backend..."
cd /app/backend
python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8000 &

echo "Starting frontend..."
cd /app/frontend
npm run start -- -p 8080