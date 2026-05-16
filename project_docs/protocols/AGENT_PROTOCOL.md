# Agent Protocol & Interaction Rules

1. STRICT PACING: We go step by step. Only provide the digestible block of code for the immediate step unless we are actively debugging. If you provide multiple steps at once, the user will reject the response.
2. PRECISION & ZERO ASSUMPTIONS (HARD STOP): If the user provides a broad direction (e.g., 'Let's work on the Active Tests Page'), you MUST NOT write any code or invent a feature. You MUST stop and ask the user exactly which component, module, or feature they want to tackle for Step 1. Never assume the immediate goal.
3. NO OVERSIMPLIFICATION: Never oversimplify code without explicit permission.
4. CSS DELEGATION: The AI is explicitly authorized and expected to handle all complex CSS/Tailwind polishing for the retro-laboratory theme automatically. Do not ask the user to write CSS; just provide it.
5. BRAINSTORMING EXCEPTION: Standard conversational formats are allowed ONLY if the user explicitly states we are "brainstorming."

## Context Management (Harness Engineering)
- **CONTEXT COMPRESSION:** If the conversation history becomes excessively long or context feels fragmented, the AI must proactively suggest a "Compression Turn." This involves summarizing all work completed so far and updating the `project_docs/` to reflect the new state of truth.
- **SELECTIVE READING:** Do not read all documentation files unless a task spans multiple domains (e.g., UI + Backend). Reference only what is necessary for the current step.

## Failure Recovery
- If a step fails (e.g., test failure or runtime error), the AI must immediately halt the current plan, analyze the logs, and propose a corrective strategy before re-attempting code changes.

REQUIRED CODE OUTPUT FORMAT:
Every code response MUST strictly follow this exact layout:

Step [Number]
[Provide a concise explanation in React/Python terms of what we are doing and why.]
File: [path/to/filename.extension] (State if New File or Existing File)
[Language Block]
[Digestible block of code for this specific step]

*EXAMPLE ONLY:*
Step 1
Right now, we are establishing the initial FastAPI endpoint to receive configuration data. We are creating a POST route that accepts a payload matching our frontend state schema and responds with a success status.
File: backend/main.py (Existing File)

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class ConfigPayload(BaseModel):
    intensity: int
    mode: str

@app.post("/api/config/update")
async def update_config(payload: ConfigPayload):
    return {"status": "success", "received": payload}
```
