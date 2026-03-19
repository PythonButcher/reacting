from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# Import the new project stats scanner
from backend_core.project_stats import scan_project_stats
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

@app.get("/api/weather")
async def get_weather():
    return {
        "id": 1,
        "name": "Solo Laboratory",
        "status": "Online",
        "details": "This data is coming directly from your FastAPI backend."
    }

@app.get("/api/stats")
async def get_project_stats():
    """
    Returns general filesystem statistics for the current workspace.
    This endpoint scans the project directory and returns structural metrics.
    """

    # Determine the root of the project
    project_root = str(Path(__file__).parent.parent.resolve())

    # Run the new stats scanner
    stats = scan_project_stats(project_root)

    return {
        "project_stats": stats
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
