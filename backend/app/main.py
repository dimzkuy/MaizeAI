from fastapi import FastAPI, File, UploadFile
from app.services.loadModel import load_model
from app.routes.predict import predict_image

app = FastAPI()

# Load model saat startup
@app.on_event("startup")
def startup():
    load_model()

# Endpoint untuk memeriksa apakah backend berjalan dengan baik
@app.get("/")
def root():
    return {"message": "Backend telah berhasil dijalankan!"}

# Endpoint untuk memproses prediksi gambar yang diunggah
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    result = predict_image(image_bytes)
    return result