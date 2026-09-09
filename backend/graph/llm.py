from langchain_openai import ChatOpenAI
import os
from dotenv import load_dotenv
load_dotenv()


supervisor_llm = ChatOpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url=os.getenv("OPENROUTER_BASE_URL"),
    model="mistralai/mistral-small-3.2-24b-instruct",
    temperature=0,
)

agent_llm = ChatOpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url=os.getenv("OPENROUTER_BASE_URL"),
    model="anthropic/claude-sonnet-5", 
    temperature=0.2,
    reasoning={"effort": "high"},
    streaming=True,
)

synthesizer_llm = ChatOpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url=os.getenv("OPENROUTER_BASE_URL"),
    model="google/gemini-2.5-flash-lite",
    temperature=0,
    max_tokens=4000,
    streaming=True,
)