from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pickle
import numpy as np
import os

app = FastAPI(title="Kerala Fertilizer Recommendation API")

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

# Global variables
clf_model = None
reg_model = None
scaler = None
target_encoder = None


# Load model safely on startup
@app.on_event("startup")
def load_fertilizer_system():
    global clf_model, reg_model, scaler, target_encoder

    try:
        base_dir = os.path.dirname(os.path.abspath(__file__))
        model_path = os.path.join(base_dir, "fertilizer_system_kerala.pkl")

        if not os.path.exists(model_path):
            raise FileNotFoundError("fertilizer_system_kerala.pkl not found")

        with open(model_path, "rb") as f:
            fertilizer_system = pickle.load(f)

        clf_model = fertilizer_system["clf_model"]
        reg_model = fertilizer_system["reg_model"]
        scaler = fertilizer_system["scaler"]
        target_encoder = fertilizer_system["target_encoder"]

        print("✅ Fertilizer model loaded successfully")

    except Exception as e:
        print(f"❌ Fertilizer model loading failed: {e}")
        raise RuntimeError(f"Model loading failed: {e}")


class FertilizerInput(BaseModel):
    soil_type: int
    crop_type: int
    season: int
    soil_ph: float
    nitrogen: float
    phosphorus: float
    potassium: float


@app.get("/")
def health_check():
    return {"status": "Fertilizer API running"}


@app.post("/predict")
def predict_fertilizer(data: FertilizerInput):
    global clf_model, reg_model, scaler, target_encoder

    if not all([clf_model, reg_model, scaler, target_encoder]):
        raise HTTPException(status_code=500, detail="Model not loaded")

    try:
        features = np.array([[ 
            data.soil_type,
            data.crop_type,
            data.season,
            data.soil_ph,
            data.nitrogen,
            data.phosphorus,
            data.potassium
        ]], dtype=float)

        scaled_features = scaler.transform(features)

        pred_class = clf_model.predict(scaled_features)[0]
        fertilizer_name = target_encoder.inverse_transform([pred_class])[0]

        fertilizer_amount = reg_model.predict(scaled_features)[0]

        return {
            "fertilizer_name": fertilizer_name,
            "fertilizer_amount_kg_acre": round(float(fertilizer_amount), 2)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))