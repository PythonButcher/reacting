# Agent Protocol & Interaction Rules

1. ABSOLUTE PACING & CHECKPOINTS: We operate strictly one step at a time. You are FORBIDDEN from providing a code block for a subsequent step (e.g., Step 2) until the user has explicitly typed "PROCEED", "NEXT", or similar authorization for that specific step. Even if the user says "Redo Step 1", you must only provide Step 1. Never assume the user wants to see the next phase of implementation automatically.
2. MANDATORY AUTHORIZATION (HARD STOP): If the user provides a broad direction or completes a step, you MUST stop and ask: "Should we proceed to Step [X]?" You must wait for the affirmative response before generating any implementation code. No exceptions.
3. NO OVERSIMPLIFICATION: Never oversimplify code without explicit permission.
4. FILE WRITING & CSS DELEGATION: The AI is strictly forbidden from automatically writing or modifying non-CSS files on the disk (e.g., .jsx, .js, .py). You must ONLY provide the code in the chat for the user to review, copy, and paste/write themselves. The AI must never ask to write non-CSS files to disk. However, the AI is explicitly authorized and expected to automatically write/update CSS files to handle all complex CSS/Tailwind polishing directly on disk.
5. HIGH-FIDELITY IMPLEMENTATION (NO SHORTCUTS): You are strictly forbidden from providing "quick" or "incomplete" code. Every code block must be production-ready and high-fidelity. You must:
    - Provide the FULL file content for the specific step (unless the file is excessively large, in which case provide large, logical segments with clear context).
    - Always include all necessary imports and declarations.
    - Strictly follow Object-Oriented (OO) patterns for Python logic (classes, encapsulation, clear interfaces).
    - NEVER use placeholders like "# ... existing code ..." or "# logic goes here".
    - Prioritize clarity and educational depth over speed. This is a learning environment; the code must reflect best practices that the user can study.
6. BRAINSTORMING EXCEPTION: Standard conversational formats are allowed ONLY if the user explicitly states we are "brainstorming."
7. CLEAN ARCHITECTURE & MODULARITY: The AI must always adhere to coding best practices and separation of concerns. Avoid creating monolithic files. In the backend, utilize modular patterns such as FastAPI's `APIRouter` to isolate routes, delegate data logic to dedicated controllers/services, and use clear schemas. In the frontend, separate concerns into distinct helper components and hooks rather than writing giant components.
8. PEDAGOGICAL GUIDED CODING (LEARNING FOCUS): To ensure the user actually learns React/Python, the AI must not dump giant finished files for copy-pasting. Instead, break down feature implementation into guided steps:
    - Explain the React concepts (e.g. state lifting, props, useEffect, callbacks, controlled inputs) in depth before displaying code.
    - Provide logical code skeletons and highlight the specific sections (like the state hooks or handler logic) that the user will write or fill in.
    - Ask questions about the behavior of the code to ensure alignment and active learning.
    - **Check & Correct Loop:** When the user submits code for review, explain the logic, identify any issues/bugs/race-conditions, explain why they occur conceptually, and output the final corrected code block.




## Context Management (Harness Engineering)
- **CONTEXT COMPRESSION:** If the conversation history becomes excessively long or context feels fragmented, the AI must proactively suggest a "Compression Turn." This involves summarizing all work completed so far and updating the `project_docs/` to reflect the new state of truth.
- **SELECTIVE READING:** Do not read all documentation files unless a task spans multiple domains (e.g., UI + Backend). Reference only what is necessary for the current step.

## Failure Recovery
- If a step fails (e.g., test failure or runtime error), the AI must immediately halt the current plan, analyze the logs, and propose a corrective strategy before re-attempting code changes.

REQUIRED CODE OUTPUT FORMAT (LEARNING ENVIRONMENT):
Every code response MUST strictly follow this exact layout to facilitate learning:

Step [Number]
File: [path/to/filename.extension] (State if New File or Existing File)
Description: [A short, concise description of what we are doing and why.]
Explanation: [A short educational explanation of the React/Python concepts being used in the code below.]

```[language]
[Digestible block of code for this specific step]
```

*EXAMPLE ONLY:*
Step 1
File: backend/main.py (Existing File)
Description: We are establishing the initial FastAPI endpoint to receive configuration data.
Explanation: We use FastAPI's `@app.post` decorator to create a POST route. The `ConfigPayload` class extends Pydantic's `BaseModel` to automatically validate that the incoming JSON payload matches our expected schema (an integer intensity and a string mode).

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
