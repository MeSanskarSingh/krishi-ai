from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

# --- Initialize FastAPI app ---
app = FastAPI(title="Kerala Fertilizer Recommendation API")

# --- CORS Middleware ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Load the trained Kerala system ---
with open("fertilizer_system_kerala.pkl", "rb") as f:
    fertilizer_system = pickle.load(f)

clf_model = fertilizer_system["clf_model"]
reg_model = fertilizer_system["reg_model"]
scaler = fertilizer_system["scaler"]
target_encoder = fertilizer_system["target_encoder"]

# --- Input Schema ---
class FertilizerInput(BaseModel):
    soil_type: int
    crop_type: int
    season: int
    soil_ph: float
    nitrogen: float
    phosphorus: float
    potassium: float

# --- Prediction Endpoint ---
@app.post("/predict")
def predict_fertilizer(data: FertilizerInput):
    # Convert input into float array
    features = np.array([[
        data.soil_type,
        data.crop_type,
        data.season,
        data.soil_ph,
        data.nitrogen,
        data.phosphorus,
        data.potassium
    ]], dtype=float)

    # Scale all features
    scaled_features = scaler.transform(features)

    # Classification → Fertilizer name
    pred_class = clf_model.predict(scaled_features)[0]
    fertilizer_name = target_encoder.inverse_transform([pred_class])[0]

    # Regression → Fertilizer amount
    fertilizer_amount = reg_model.predict(scaled_features)[0]

    return {
        "fertilizer_name": fertilizer_name,
        "fertilizer_amount_kg_acre": round(float(fertilizer_amount), 2)
    }

# --- Root Endpoint ---
@app.get("/")
def home():
    return {"message": "Welcome to the Kerala Fertilizer Recommendation API"}