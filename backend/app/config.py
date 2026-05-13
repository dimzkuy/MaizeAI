import os

from dotenv import load_dotenv

load_dotenv()

# GCS CONFIG
GCS_BUCKET_NAME = os.environ["GCS_BUCKET_NAME"]
GCS_MODEL_BLOB = os.environ["GCS_MODEL_BLOB"]
MODEL_ARCHITECTURE = os.getenv("MODEL_ARCHITECTURE", "").strip()

CLASS_NAMES = [
    "Blight",
    "Common Rust",
    "Gray Leaf Spot",
    "Healthy"
]

IMAGE_SIZE = (260, 260)

HOST = "127.0.0.1"
PORT = 8000
DEBUG = True