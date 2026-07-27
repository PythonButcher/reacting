# Backend Architecture (backend/ARCHITECTURE.md)

## System Overview
The backend is a lightweight **FastAPI** service running on Uvicorn (`http://127.0.0.1:8000`). It provides project filesystem telemetry, weather proxying, and local research journal storage.

## Directory Structure
```text
backend/
├── main.py                # FastAPI Application entry point & Uvicorn runner
├── backend_core/          # Core Python modules (project_stats.py, etc.)
├── journal_vault.json     # Local JSON persistent storage (git-ignored)
├── requirements.txt       # Python dependencies (FastAPI, Uvicorn, httpx)
└── ARCHITECTURE.md        # This file
```

## Active API Endpoints
- `GET /api/weather`: External weather API integration.
- `GET /api/stats`: Project filesystem scanner telemetry (returns total files, size, distribution).
- `POST /api/journal`: Create research log entry.
- `GET /api/journal`: List research log entries (newest first).
- `DELETE /api/journal/{timestamp}`: Remove specific research entry.

## Execution & Runtime Rules
- **Runtime:** Python 3.10+
- **Launch Command:** `python backend/main.py`
- **CORS:** Pre-configured for `http://localhost:5173` and `http://localhost:5174`.
- **Logic Patterns:** Python core modules must follow clear Object-Oriented (OO) patterns (classes, encapsulation, clean methods).
