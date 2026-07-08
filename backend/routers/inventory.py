from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
import os
import uuid
import csv
import json
from pathlib import Path
from datetime import datetime
import httpx
from backend_core.vault_service import VaultService

router = APIRouter()

# Initialize core service pointing to parent backend folder
BACKEND_DIR = Path(__file__).parent.parent
vault_service = VaultService(BACKEND_DIR)

class RegisterAPIPayload(BaseModel):
    name: str
    url: str

@router.get("/inventory")
async def list_inventory():
    return vault_service.get_all_assets()

@router.post("/inventory/upload")
async def upload_dataset(file: UploadFile = File(...)):
    filename = file.filename
    ext = Path(filename).suffix.lower()
    
    if ext not in [".csv", ".json"]:
        raise HTTPException(status_code=400, detail="Only CSV or JSON datasets are supported.")
        
    asset_id = uuid.uuid4().hex
    unique_filename = f"{asset_id}_{filename}"
    file_path = vault_service.assets_dir / unique_filename
    
    # Save the incoming file stream
    try:
        content = await file.read()
        with open(file_path, "wb") as f:
            f.write(content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to write dataset file: {str(e)}")
        
    # Analyze row counts and column names using standard libraries
    row_count = 0
    columns = []
    
    try:
        if ext == ".csv":
            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                reader = csv.reader(f)
                try:
                    headers = next(reader)
                    columns = [h.strip() for h in headers if h.strip()]
                    for _ in reader:
                        row_count += 1
                except StopIteration:
                    pass
        elif ext == ".json":
            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                data = json.load(f)
                if isinstance(data, list):
                    row_count = len(data)
                    if row_count > 0 and isinstance(data[0], dict):
                        columns = list(data[0].keys())
                elif isinstance(data, dict):
                    row_count = 1
                    columns = list(data.keys())
    except Exception as e:
        # Cleanup broken upload if layout analysis fails
        if file_path.exists():
            os.remove(file_path)
        raise HTTPException(status_code=400, detail=f"Failed to parse layout details: {str(e)}")
        
    asset_entry = {
        "id": asset_id,
        "name": filename,
        "type": "file",
        "format": ext[1:],
        "path": str(file_path.resolve()),
        "size_bytes": len(content),
        "row_count": row_count,
        "columns": columns,
        "registered_at": datetime.now().isoformat()
    }
    vault_service.register_asset(asset_entry)
    return {"status": "success", "message": f"Asset {filename} registered.", "asset": asset_entry}

@router.post("/inventory/register-api")
async def register_api(payload: RegisterAPIPayload):
    # Retrieve mock or live data to verify response structure
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(payload.url, timeout=5.0)
            response.raise_for_status()
            data = response.json()
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Failed to fetch or parse API: {str(e)}")
            
    row_count = 0
    columns = []
    
    if isinstance(data, list):
        row_count = len(data)
        if row_count > 0 and isinstance(data[0], dict):
            columns = list(data[0].keys())
    elif isinstance(data, dict):
        row_count = 1
        columns = list(data.keys())
        
    asset_entry = {
        "id": uuid.uuid4().hex,
        "name": payload.name,
        "type": "api",
        "format": "json",
        "url": payload.url,
        "size_bytes": len(response.content),
        "row_count": row_count,
        "columns": columns,
        "registered_at": datetime.now().isoformat()
    }
    vault_service.register_asset(asset_entry)
    return {"status": "success", "message": f"API source {payload.name} registered.", "asset": asset_entry}

@router.delete("/inventory/{asset_id}")
async def delete_asset(asset_id: str):
    removed = vault_service.remove_asset(asset_id)
    if not removed:
        raise HTTPException(status_code=404, detail="Asset not found in inventory registry.")
    return {"status": "success", "message": f"Asset {removed.get('name')} purged from vault."}