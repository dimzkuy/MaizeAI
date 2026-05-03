from PIL import Image
import numpy as np
import io

from app.config import CLASS_NAMES, IMAGE_SIZE
import app.services.loadModel as model_loader

# Mapping kelas prediksi
# Function untuk memproses gambar sebelum prediksi
def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize(IMAGE_SIZE)

    img = np.array(img).astype(np.float32)

    # preprocess_input Xception
    img = (img / 127.5) - 1.0

    img = np.expand_dims(img, axis=0)

    return img

# Function untuk melakukan prediksi pada gambar yang diunggah
def predict_image(image_bytes):
    img_array = preprocess_image(image_bytes)

    pred = model_loader.session.run(
        None,
        {model_loader.input_name: img_array}
    )[0]

    idx = int(np.argmax(pred))
    confidence = float(np.max(pred) * 100)

    return {
        "prediction": CLASS_NAMES[idx],
        "confidence": round(confidence, 2)
    }