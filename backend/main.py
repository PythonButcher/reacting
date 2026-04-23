from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from backend_core.project_stats import scan_project_stats
import os
import json
from pathlib import Path
import httpx
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", "http://127.0.0.1:5173",
        "http://localhost:5174", "http://127.0.0.1:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === NEW: Journal Database Setup ===
JOURNAL_DB_FILE = Path(__file__).parent / "journal_vault.json"

if not JOURNAL_DB_FILE.exists():
    with open(JOURNAL_DB_FILE, "w") as f:
        json.dump([], f)

class JournalEntryPayload(BaseModel):
    note: str
    timestamp: str
# ===================================

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
            print(f"I see no weather data: {str(e)}")
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

@app.post("/api/journal")
async def save_journal_entry(entry: JournalEntryPayload):
    """
    Receives a new journal entry from the React frontend and 
    appends it to the JSON vault.
    """
    try:
        # Read the existing data
        if JOURNAL_DB_FILE.exists():
            with open(JOURNAL_DB_FILE, "r") as f:
                try:
                    vault_data = json.load(f)
                except json.JSONDecodeError:
                    vault_data = []
        else:
            vault_data = []
            
        # Append the new entry as a dictionary
        vault_data.append({
            "note": entry.note,
            "timestamp": entry.timestamp
        })
        
        # Write the updated array back to the file
        with open(JOURNAL_DB_FILE, "w") as f:
            json.dump(vault_data, f, indent=4)
            
        return {"status": "success", "message": "Entry committed to vault"}
        
    except Exception as e:
        return {"status": "error", "message": str(e)}
    
@app.get("/api/journal")
async def get_journal_entries():
    """
    Retrieves all journal entries from the JSON vault to populate
    the frontend Historical Archives.
    """
    try:
        # Check if the file exists and has content
        if not JOURNAL_DB_FILE.exists():
            return {"status": "success", "entries": []}
        
        with open(JOURNAL_DB_FILE, "r") as f:
            try:
                vault_data = json.load(f)
            except json.JSONDecodeError:
                vault_data = []
        
        # Optional: Reverse the data so the newest entries appear first
        vault_data.reverse()
            
        return {"status": "success", "entries": vault_data}
        
    except Exception as e:
        return {"status": "error", "message": str(e), "entries": []}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
