from pathlib import Path
import onnxruntime as ort
from google.cloud import storage

from app.config import GCS_BUCKET_NAME, GCS_MODEL_BLOB

session = None
input_name = None


CACHE_PATH = Path("/tmp/model.onnx")


def load_model():
    global session, input_name

    if session is None:
        print("Loading model...")

        client = storage.Client()
        bucket = client.bucket(GCS_BUCKET_NAME)
        blob = bucket.blob(GCS_MODEL_BLOB)

        CACHE_PATH.parent.mkdir(parents=True, exist_ok=True)

        # download model hanya kalau belum ada
        if not CACHE_PATH.exists():
            print("Downloading model from GCS.")
            blob.download_to_filename(CACHE_PATH)
            print("Download complete!")
        else:
            print("Model sudah ada")

        # set path fix
        model_path = CACHE_PATH

        # load ONNX
        session = ort.InferenceSession(str(model_path))
        input_name = session.get_inputs()[0].name

        print("Model berhasil dimuat")

    return session, input_name