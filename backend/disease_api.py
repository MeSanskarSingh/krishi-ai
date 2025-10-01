from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from io import BytesIO
from PIL import Image
import numpy as np
import os

app = FastAPI()

# Allow your frontend to access the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # your Next.js app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "disease_cnn.h5")
model = load_model(MODEL_PATH)
print("Model loaded successfully.")

# Class names
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

# Preprocess image
def preprocess(img: Image.Image):
    img = img.resize((128, 128))
    img_array = np.array(img) / 255.0
    if img_array.shape[-1] != 3:
        # Ensure 3 channels
        img_array = np.stack([img_array]*3, axis=-1)
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        img = Image.open(BytesIO(contents)).convert("RGB")
        processed = preprocess(img)

        print("Processed input shape:", processed.shape)

        preds = model.predict(processed)
        print("Raw predictions:", preds)

        if preds.size == 0 or preds.shape[1] != len(CLASS_NAMES):
            return JSONResponse({"error": "Prediction shape mismatch."}, status_code=500)

        idx = int(np.argmax(preds))
        predicted_class = CLASS_NAMES[idx]
        confidence = float(np.max(preds))

        return JSONResponse({
            "prediction": predicted_class,
            "confidence": round(confidence * 100, 2)
        })

    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=7000)
