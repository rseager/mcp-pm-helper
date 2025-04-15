from fastapi import FastAPI, Query
from prompt_builder import build_prompt
from openai_client import call_openai
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/generate")
def generate_output(
    brief_id: str = Query(...),
    task: str = Query(...)
):
    try:
        prompt = build_prompt(brief_id=brief_id, task=task)
        response = call_openai(prompt)
        print("✅ LLM Response:", response)  # 👈 Add this line
        return {"output": response}
    except Exception as e:
        print("🔥 ERROR in /generate:", str(e))
        return {"error": str(e)}
