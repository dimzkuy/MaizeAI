import onnxruntime as ort

session = None
input_name = None

def load_model():
    global session, input_name

    if session is None:
        session = ort.InferenceSession("models/xception_cornmodel.onnx")
        input_name = session.get_inputs()[0].name
        print("Model berhasil dimuat")

    return session, input_name