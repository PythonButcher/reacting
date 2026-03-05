from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import os
from pathlib import Path

app = FastAPI()

# Configure CORS so your React app (on http://localhost:5173 or 5174) can talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", "http://127.0.0.1:5173",
        "http://localhost:5174", "http://127.0.0.1:5174"
    ],  # Default Vite port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello from the Python backend!"}

@app.get("/api/data")
async def get_data():
    return {
        "id": 1,
        "name": "Solo Laboratory",
        "status": "Online",
        "details": "This data is coming directly from your FastAPI backend."
    }

@app.get("/api/stats")
async def get_project_stats():
    """Returns aggregated stats from the radar engine for the current workspace."""
    project_root = str(Path(__file__).parent.parent.resolve())

    health = scan_workspace_health(project_root)
    debt = scan_technical_debt(project_root)
    edits = scan_recent_edits(project_root, max_items=20, max_days=7)
    
    return {
        "health": health,
        "debt": debt,
        "edits": edits
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
