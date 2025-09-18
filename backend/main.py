from fastapi import FastAPI
from pydantic import BaseModel
from huggingface_hub import InferenceClient
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI()

# Allow frontend (Next.js) to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],   # In production, restrict to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Hugging Face setup
HF_TOKEN = "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"
client = InferenceClient("mistralai/Mistral-7B-Instruct-v0.2", token=HF_TOKEN)

class Query(BaseModel):
    message: str

def ask_query(question: str) -> str:
    response = client.chat_completion(
        messages=[
            {"role": "system", "content": "You are a helpful agriculture assistant for farmers."},
            {"role": "user", "content": question},
        ],
        max_tokens=150,
        temperature=0.5,
    )
    return response.choices[0].message["content"]

@app.post("/chat")
async def chat(query: Query):
    answer = ask_query(query.message)
    return {"response": answer}
