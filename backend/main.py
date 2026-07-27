from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from backend_core.project_stats import scan_project_stats
from backend_core.chat_service import chat_service
from routers.inventory import router as inventory_router
from routers.telemetry import router as telemetry_router
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

# === Pydantic Models ===
class JournalEntryPayload(BaseModel):
    note: str
    timestamp: str

class ChatRequest(BaseModel):
    message: str
# ========================

# === Journal Database Setup ===
JOURNAL_DB_FILE = Path(__file__).parent / "journal_vault.json"

if not JOURNAL_DB_FILE.exists():
    with open(JOURNAL_DB_FILE, "w") as f:
        json.dump([], f)
# ==============================

@app.get("/")
async def root():
    return {"message": "Hello from the Python backend!"}

@app.get("/api/weather")
async def get_weather():
    api_key = os.getenv("WEATHERAPI_KEY")
    zip_code = os.getenv("WEATHERAPI_ZIP")
    
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
            return {"error": f"Failed to fetch weather data: {str(e)}"}

@app.get("/api/stats")
async def get_project_stats():
    project_root = str(Path(__file__).parent.parent.resolve())
    stats = scan_project_stats(project_root)
    return {"project_stats": stats}

@app.post("/api/journal")
async def save_journal_entry(entry: JournalEntryPayload):
    try:
        if JOURNAL_DB_FILE.exists():
            with open(JOURNAL_DB_FILE, "r") as f:
                try:
                    vault_data = json.load(f)
                except json.JSONDecodeError:
                    vault_data = []
        else:
            vault_data = []
            
        vault_data.append({"note": entry.note, "timestamp": entry.timestamp})
        
        with open(JOURNAL_DB_FILE, "w") as f:
            json.dump(vault_data, f, indent=4)
            
        return {"status": "success", "message": "Entry committed to vault"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
    
@app.get("/api/journal")
async def get_journal_entries():
    try:
        if not JOURNAL_DB_FILE.exists():
            return {"status": "success", "entries": []}
        
        with open(JOURNAL_DB_FILE, "r") as f:
            try:
                vault_data = json.load(f)
            except json.JSONDecodeError:
                vault_data = []
        
        vault_data.reverse()
        return {"status": "success", "entries": vault_data}
    except Exception as e:
        return {"status": "error", "message": str(e), "entries": []}

@app.delete("/api/journal/{timestamp}")
def delete_journal_entry(timestamp: str):
    try:
        if not JOURNAL_DB_FILE.exists():
            return {"status": "error", "message": "Vault is empty"}

        with open(JOURNAL_DB_FILE, "r") as f:
            vault_data = json.load(f)
            
        updated_vault = [entry for entry in vault_data if entry.get("timestamp") != timestamp]
        
        with open(JOURNAL_DB_FILE, "w") as f:
            json.dump(updated_vault, f, indent=4)
            
        return {"status": "success", "message": "Log purged from vault"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.post("/api/chat")
async def chat_handler(request: ChatRequest):
    """
    Primary interface for the Research Chatbot. 
    Delegates processing to the ResearchChatService.
    """
    response_text = chat_service.process_message(request.message)
    return {
        "status": "success",
        "response": response_text
    }

# Register modular routers
app.include_router(inventory_router, prefix="/api")
app.include_router(telemetry_router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)