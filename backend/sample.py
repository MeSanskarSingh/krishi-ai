import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image
import os

# Path to your model and test image
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "disease_cnn.h5")
test_image_path = os.path.join(BASE_DIR, "sample-leaf.jpeg")  # put a sample image here

# Load model
model = load_model(model_path)
print("Model loaded successfully.")

# Preprocess image
def preprocess(img):
    img = img.resize((128, 128))  # adjust to your model input
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0
    return img_array

img = Image.open(test_image_path).convert("RGB")
processed = preprocess(img)

# Predict
preds = model.predict(processed)
idx = np.argmax(preds)
confidence = float(np.max(preds))

print(f"Predicted class index: {idx}, Confidence: {confidence*100:.2f}%")
