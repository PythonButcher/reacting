import json
import os
from pathlib import Path
from datetime import datetime

class VaultService:
    """
    Core service to handle JSON database reads, writes, and physical file purges.
    """
    def __init__(self, base_dir: Path):
        self.base_dir = base_dir
        self.vault_file = base_dir / "data_vault.json"
        self.assets_dir = base_dir / "data_assets"
        
        # Verify base assets storage folder and registry database exist
        self.assets_dir.mkdir(parents=True, exist_ok=True)
        if not self.vault_file.exists():
            self._write_registry([])
            
    def _read_registry(self) -> list:
        try:
            if self.vault_file.exists():
                with open(self.vault_file, "r") as f:
                    return json.load(f)
        except Exception:
            pass
        return []
        
    def _write_registry(self, data: list):
        try:
            with open(self.vault_file, "w") as f:
                json.dump(data, f, indent=4)
        except Exception as e:
            print(f"Vault registry write failure: {str(e)}")
            
    def get_all_assets(self) -> list:
        return self._read_registry()
        
    def register_asset(self, asset_entry: dict):
        registry = self._read_registry()
        registry.append(asset_entry)
        self._write_registry(registry)
        
    def remove_asset(self, asset_id: str) -> dict:
        registry = self._read_registry()
        target_entry = None
        for entry in registry:
            if entry.get("id") == asset_id:
                target_entry = entry
                break
                
        if not target_entry:
            return None
            
        # If it's a file asset, purge the physical file from the disk
        if target_entry.get("type") == "file":
            file_path = Path(target_entry.get("path"))
            if file_path.exists():
                try:
                    os.remove(file_path)
                except Exception as e:
                    print(f"Failed to delete physical file {file_path}: {str(e)}")
                    
        updated_registry = [e for e in registry if e.get("id") != asset_id]
        self._write_registry(updated_registry)
        return target_entry