import os
from google import genai
from dotenv import load_dotenv

# Load local environment variables
load_dotenv()

def run_ai_task(prompt):
    # Initializes using GEMINI_API_KEY from environment variables
    client = genai.Client()
    
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt,
    )
    print(f"AI Output: {response.text}")

if __name__ == "__main__":
    test_prompt = "Explain quantum computing in one sentence."
    run_ai_task(test_prompt)