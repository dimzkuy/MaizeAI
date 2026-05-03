import onnxruntime as ort

# Inisialisasi variabel global untuk menyimpan session dan input name
session = None
input_name = None

# Function untuk memuat model ONNX
def load_model():
    global session, input_name

    if session is None:
        session = ort.InferenceSession("models/xception_cornmodel.onnx")
        input_name = session.get_inputs()[0].name
        print("Model berhasil dimuat")

    return session, input_name