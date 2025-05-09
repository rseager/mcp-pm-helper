import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def call_openai(prompt_messages):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=prompt_messages,
        temperature=0.7,
        max_tokens=400
    )
    return response.choices[0].message.content
