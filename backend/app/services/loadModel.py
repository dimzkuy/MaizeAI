from pathlib import Path
import re
import onnxruntime as ort
from google.cloud import storage

from app.config import GCS_BUCKET_NAME, GCS_MODEL_BLOB, MODEL_ARCHITECTURE

session = None
input_name = None
model_architecture = ""


CACHE_PATH = Path("/tmp/model.onnx")

# Memperjelas nama model dari nama file blob GCS
def prettify_model_name(model_name: str) -> str:
    stem = Path(model_name).stem
    normalized = re.sub(r"[_\-]+", " ", stem).strip()

    if not normalized:
        return "Unknown"

    normalized = re.sub(r"(?<=[a-z])(?=[A-Z0-9])|(?<=[A-Z])(?=[A-Z][a-z])", " ", normalized)
    normalized = re.sub(r"(?<=[A-Za-z])(?=\d)", " ", normalized)

    return " ".join(word.capitalize() if not word.isupper() else word for word in normalized.split())

# Menemukan arsitektur model dari metadata ONNX atau env
def resolve_model_architecture(model_blob_name: str, inference_session: ort.InferenceSession) -> str:
    env_architecture = MODEL_ARCHITECTURE
    if env_architecture:
        return env_architecture

    metadata_map = getattr(inference_session.get_modelmeta(), "custom_metadata_map", {}) or {}
    for key in ("architecture", "model_architecture", "model_name", "name"):
        value = metadata_map.get(key)
        if value:
            return value

    return prettify_model_name(model_blob_name)

# Fungsi untuk memuat model ONNX dari GCS atau cache lokal
def load_model():
    global session, input_name, model_architecture

    if session is None:
        CACHE_PATH.parent.mkdir(parents=True, exist_ok=True)

        if CACHE_PATH.exists():
            print(f"Using cached model from {CACHE_PATH}")
            model_path = CACHE_PATH
        else:
            print(f"Loading model from GCS: {GCS_MODEL_BLOB}")

            client = storage.Client()
            bucket = client.bucket(GCS_BUCKET_NAME)
            blob = bucket.blob(GCS_MODEL_BLOB)

            print("Downloading model from GCS.")
            blob.download_to_filename(CACHE_PATH)
            print("Download complete!")

            # set path fix
            model_path = CACHE_PATH

        # load ONNX
        session = ort.InferenceSession(str(model_path))
        input_name = session.get_inputs()[0].name
        model_architecture = resolve_model_architecture(GCS_MODEL_BLOB, session)

        print(f"Model berhasil dimuat ({model_architecture})")

    return session, input_name, model_architecture