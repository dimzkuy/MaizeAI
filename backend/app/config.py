MODEL_PATH = "models/xception_cornmodel.onnx"

CLASS_NAMES = [
    "Blight",
    "Common Rust",
    "Gray Leaf Spot",
    "Healthy"
]

IMAGE_SIZE = (224, 224)

HOST = "127.0.0.1"
PORT = 8000
DEBUG = True