🌾 Krishi AI
Intelligent AI-Powered Agriculture Assistance Platform

Krishi AI is a production-ready AI-driven web application designed to assist farmers with crop management, fertilizer recommendations, disease detection, and agricultural guidance using machine learning and modern web technologies.

The system is deployed using a microservice architecture with independent AI APIs and a cloud-hosted frontend.

🚀 Live Deployment

🌍 Frontend (Vercel): [Your Vercel URL here]

🌿 Fertilizer API: https://fertilizer-api-5dhb.onrender.com

🌱 Disease Detection API: [Insert disease API URL]

🤖 Chatbot API (Kisan Mitra): [Insert chatbot API URL]

🏗 System Architecture
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

Krishi AI follows a microservice architecture, where each AI capability is independently deployed and scalable.

🧠 Core Features
🌾 1. Fertilizer Recommendation System

Random Forest Classifier + Regressor

Predicts optimal fertilizer type

Predicts required fertilizer quantity (kg/acre)

Kerala-specific dataset

Feature scaling with StandardScaler

Encoded categorical agricultural inputs

🌱 2. Plant Disease Detection

CNN-based image classification model

Detects crop disease from uploaded leaf images

FastAPI backend with image processing

🤖 3. Kisan Mitra (AI Chatbot)

Powered by HuggingFace Inference API

Context-aware agricultural assistant

Provides concise, solution-focused answers

Designed for farmer usability

🛠 Tech Stack
Frontend

Next.js

Tailwind CSS

Deployed on Vercel

Backend

FastAPI

Uvicorn

CORS middleware

Environment-based configuration

Machine Learning

Scikit-learn (Random Forest)

NumPy

Pandas

StandardScaler

LabelEncoder

TensorFlow / Keras (for CNN disease model)

Deployment

Render (Backend APIs)

Vercel (Frontend)

Environment variables for API routing

Version-pinned ML environments for model stability
