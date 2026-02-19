from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from huggingface_hub import InferenceClient
from fastapi.middleware.cors import CORSMiddleware
import os

# Initialize FastAPI app
app = FastAPI(title="Krishi AI Chatbot API")

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

# Load HuggingFace token
HF_TOKEN = os.getenv("HF_TOKEN")

if not HF_TOKEN:
    raise RuntimeError("HF_TOKEN environment variable not set")

# Initialize client
client = InferenceClient(
    model="mistralai/Mistral-7B-Instruct-v0.2",
    token=HF_TOKEN
)

class Query(BaseModel):
    message: str

def ask_query(question: str) -> str:
    response = client.chat_completion(
        messages=[
            {
                "role": "system",
                "content": """
            You are Kisan Mitra, an expert agriculture assistant helping Indian farmers.

            Rules:
            - Give short, practical, field-level advice.
            - Avoid textbook language.
            - Suggest actionable steps.
            - If the question is vague, ask 1 clarifying question.
            - Mention crop, soil type, season, or region if relevant.
            - Use simple language farmers can understand.
            - Do NOT give long essays.
            """
            },
            {
                "role": "user",
                "content": question
            },
        ],
        max_tokens=150,
        temperature=0.2,
    )

    return response.choices[0].message.content

@app.get("/")
def root():
    return {"status": "Chatbot API running"}

@app.post("/chat")
async def chat(query: Query):
    try:
        answer = ask_query(query.message)
        return {"response": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))