# Pakai Python ringan
FROM python:3.11

# Biar log langsung keluar
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Copy requirements dulu (biar caching optimal)
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy semua source code
COPY . .

# Cloud Run pakai port 8080
ENV PORT=8080

# Run FastAPI (pakai python -m biar stabil)
CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]