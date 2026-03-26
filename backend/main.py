from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# Import the new project stats scanner
from backend_core.project_stats import scan_project_stats
import os
from pathlib import Path
import httpx
from dotenv import load_dotenv

load_dotenv()


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
    # === ENTER YOUR WEATHERAPI.COM CREDENTIALS HERE ===
    api_key = os.getenv("WEATHERAPI_KEY")
    zip_code = os.getenv("WEATHERAPI_ZIP")
    # ==================================================
    
    if not api_key or not zip_code:
        return {"error": "Please set WEATHERAPI_KEY and WEATHERAPI_ZIP in backend/.env"}
        
    url = f"http://api.weatherapi.com/v1/current.json?key={api_key}&q={zip_code}&aqi=no"
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url)
            response.raise_for_status()
            data = response.json()
            return {
                "name": data.get("location", {}).get("name"),
                "region": data.get("location", {}).get("region"),
                "localtime": data.get("location", {}).get("localtime"),
                "temp_f": data.get("current", {}).get("temp_f"),
                "condition": data.get("current", {}).get("condition", {}).get("text")
            }
        except httpx.HTTPError as e:
            print("I see no weather data " [data])
            return {"error": f"Failed to fetch weather data: {str(e)}"}

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
