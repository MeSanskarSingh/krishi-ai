# 🌾 Krishi AI  
## Intelligent AI-Powered Agriculture Assistance Platform  

Krishi AI is a **production-ready AI-driven web application** designed to assist farmers with crop management, fertilizer recommendations, disease detection, and agricultural guidance using machine learning and modern web technologies.

The system follows a **microservice architecture**, with independently deployed AI APIs and a cloud-hosted frontend.

---

## 🚀 Live Deployment

- 🌍 **Frontend (Vercel):** https://krishi-ai-sigma.vercel.app/
- 🌿 **Fertilizer API:** https://fertilizer-api-5dhb.onrender.com
- 🌱 **Disease Detection API:** https://disease-api-osi8.onrender.com
- 🤖 **Chatbot API (Kisan Mitra):** https://chatbot-api-j4zf.onrender.com

---

## 🏗 System Architecture

```text
User (Browser)
      ↓
Next.js Frontend (Vercel)
      ↓
-------------------------------------
|  Fertilizer API (FastAPI + ML)   |
|  Disease API (FastAPI + CNN)     |
|  Chatbot API (FastAPI + LLM)     |
-------------------------------------
      ↓
Machine Learning Models
```

Krishi AI follows a **microservice-based architecture**, allowing each AI component to be independently scalable and maintainable.

---

## 🧠 Core Features

### 🌾 1. Fertilizer Recommendation System

- ✔ Random Forest Classifier + Regressor
- ✔ Predicts optimal fertilizer type
- ✔ Predicts required fertilizer quantity (kg/acre)
- ✔ Kerala-specific agricultural dataset
- ✔ Feature scaling using `StandardScaler`
- ✔ Encoded categorical agricultural inputs

---

### 🌱 2. Plant Disease Detection

- ✔ CNN-based image classification model
- ✔ Detects crop diseases from uploaded leaf images
- ✔ FastAPI backend with image preprocessing pipeline

---

### 🤖 3. Kisan Mitra (AI Chatbot)

- ✔ Powered by HuggingFace Inference API
- ✔ Context-aware agricultural assistant
- ✔ Provides concise, solution-focused responses
- ✔ Designed for practical farmer usability

---

## 🛠 Tech Stack

### 🌍 Frontend

- Next.js
- Tailwind CSS
- Deployed on Vercel

### ⚙ Backend

- FastAPI
- Uvicorn
- CORS Middleware
- Environment-based configuration

### 🧠 Machine Learning

- Scikit-learn (Random Forest Models)
- NumPy
- Pandas
- StandardScaler
- LabelEncoder
- TensorFlow / Keras (CNN disease model)

### ☁ Deployment

- Render (Backend APIs)
- Vercel (Frontend)
- Environment variable-based routing
- Version-pinned ML environments for model stability
