from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import app.services.loadModel as model_loader
from app.routes.predict import predict_image

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model saat startup
@app.on_event("startup")
def startup():
    model_loader.load_model()


# Endpoint untuk memeriksa apakah backend berjalan dengan baik
@app.get("/")
def root():
    return {
        "message": "Backend telah berhasil dijalankan!",
        "model_architecture": model_loader.model_architecture,
    }

# Endpoint untuk memproses prediksi gambar yang diunggah
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    result = predict_image(image_bytes)
    return result