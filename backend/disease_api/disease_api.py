from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from tensorflow.keras.models import load_model
from io import BytesIO
from PIL import Image
import numpy as np
import os

app = FastAPI(title="Krishi AI Disease Detection API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://krishi-ai-sigma.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global model variable
model = None

# Load model on startup (safer for production)
@app.on_event("startup")
def load_cnn_model():
    global model
    try:
        base_dir = os.path.dirname(os.path.abspath(__file__))
        model_path = os.path.join(base_dir, "disease_cnn.h5")

        if not os.path.exists(model_path):
            raise FileNotFoundError("disease_cnn.h5 not found")

        model = load_model(model_path)
        print("✅ Disease model loaded successfully")

    except Exception as e:
        print(f"❌ Model loading failed: {e}")
        raise RuntimeError(f"Model loading failed: {e}")


CLASS_NAMES = [
    'Banana Fruit-Scarring Beetle', 'Banana Skipper Damage', 'Banana Split Peel',
    'Banana_Anthracnose', 'Banana_Black and Yellow Sigatoka', 'Banana_Panama Wilt Disease',
    'Chewing insect damage on banana leaf', 'Corn_(maize)__Cercospora_leaf_spot Gray_leaf_spot',
    'Corn(maize)__Common_rust', 'Corn_(maize)__Northern_Leaf_Blight', 'Corn(maize)__healthy',
    'Healthy Banana', 'Healthy Banana  leaf', 'Healthy Rice Leaf', 'Pepper,_bell_Bacterial_spot',
    'Pepper,_bell_healthy', 'Potato_Early_blight', 'Potato_Late_blight', 'Potato_healthy',
    'Rice Hispa', 'Rice_Bacterial leaf blight', 'Rice_Brown spot', 'Rice_Leaf smut',
    'Rubber_Birds-eye', 'Rubber_Colleorichum', 'Rubber_Corynespora', 'Rubber_Healthy',
    'Rubber_Pesta', 'Rubber_Powdery_mildew', 'Stem Bleeding', 'Tomato_Bacterial_spot',
    'Tomato_Early_blight', 'Tomato_Late_blight', 'Tomato_Leaf_Mold', 'Tomato_Septoria_leaf_spot',
    'Tomato_Spider_mites Two-spotted_spider_mite', 'Tomato_Target_Spot',
    'Tomato_Tomato_Yellow_Leaf_Curl_Virus', 'Tomato_Tomato_mosaic_virus', 'Tomato__healthy',
    'coconut_Bud Root Dropping', 'coconut_Bud Rot', 'coconut_Gray Leaf Spot', 'coconut_Leaf Rot',
    'coffee_Health leaves', 'coffee_leaf rust', 'coffee_phoma', 'rice_Leaf Blast',
    'rice_Leaf scald', 'rice_Narrow Brown Leaf Spot', 'rice_Sheath Blight'
]


def preprocess(img: Image.Image):
    img = img.resize((128, 128))
    img_array = np.array(img) / 255.0

    if img_array.shape[-1] != 3:
        img_array = np.stack([img_array] * 3, axis=-1)

    img_array = np.expand_dims(img_array, axis=0)
    return img_array


@app.get("/")
def health_check():
    return {"status": "Disease API running"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    global model

    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded")

    try:
        contents = await file.read()
        img = Image.open(BytesIO(contents)).convert("RGB")
        processed = preprocess(img)

        preds = model.predict(processed)

        if preds.size == 0 or preds.shape[1] != len(CLASS_NAMES):
            raise ValueError("Prediction shape mismatch")

        idx = int(np.argmax(preds))
        predicted_class = CLASS_NAMES[idx]
        confidence = float(np.max(preds))

        return {
            "prediction": predicted_class,
            "confidence": round(confidence * 100, 2)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))