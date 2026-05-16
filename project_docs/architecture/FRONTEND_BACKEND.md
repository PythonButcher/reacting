# Project Architecture //: FRONTEND & BACKEND

## Project Overview
LAB_TERMINAL //: REACT is a laboratory-themed React application backed by a local FastAPI service. The project currently behaves like a control terminal for experiments, telemetry, journal entries, and resource references.

### Current Shape
- **Frontend:** React 19 / Vite. Entry: `src/main.jsx`. Router: `src/app/router.jsx`. Shell: `src/app/AppLayout.jsx`.
- **Backend:** FastAPI. Entry: `backend/main.py`. Local endpoints for weather, stats, and journal.

---

## Development Workflow
### Prerequisites
- Node.js LTS (Vite Frontend)
- Python 3.10+ (FastAPI Backend)

### Setup & Execution
1. **Frontend:** `npm install` -> `npm run dev` (Default: `http://localhost:5173`)
2. **Backend:** `python -m pip install -r backend/requirements.txt` -> `python backend/main.py` (Default: `http://127.0.0.1:8000`)

### Verification
- **Frontend:** `npm run build` (Pre-handoff), `npm run lint` (JS/JSX changes).
- **Backend:** Manual endpoint verification (No dedicated tests yet).

---

## Frontend Architecture
The frontend uses functional components, React Router, Tailwind CSS v4, and a LAB_TERMINAL visual system defined in `src/index.css`.

### Routing
- Uses `createBrowserRouter` from React Router.
- Pages: `src/pages/`.
- UI/Features: `src/components/`.
- Registration: `src/app/router.jsx`.
- Navigation: `src/components/menu/MenuBar.jsx`.

### Component Pattern
- Feature components are functional.
- `useFetchFlask` hook for simple GET requests.
- Future: API calls should move to a service layer.

### Theme System
- Tokens in `src/index.css`.
- Shared classes: `.journal-panel`, `.journal-button`, `.journal-select`, `.section-label`.
- Aesthetic: Laboratory hardware (precise, compact, mono typography).

---

## Backend Architecture
FastAPI application supporting telemetry, weather, and journal persistence.

### Runtime & Dependencies
- Entry: `backend/main.py` (Starts Uvicorn on `127.0.0.1:8000`).
- Dependencies: `backend/requirements.txt` (FastAPI, Uvicorn, httpx, python-dotenv).
- CORS enabled for localhost:5173/5174.

### Endpoints
- `GET /api/weather`: WeatherAPI integration.
- `GET /api/stats`: Project filesystem telemetry.
- `POST /api/journal`: Create research log entry.
- `GET /api/journal`: List entries (newest first).
- `DELETE /api/journal/{timestamp}`: Remove entry.

### Backend Telemetry Reference
The backend uses `backend/backend_core/project_stats.py` to scan the filesystem.
Returns JSON:
- `total_files`, `total_directories`, `total_size_bytes`, `average_file_size`, `max_directory_depth`, `file_type_distribution`, `largest_files` (Top 10).

## Directory Map
```text
C:\Users\18022\Desktop\reacting\
├───backend\
│   ├───main.py                  # FastAPI Entry
│   ├───backend_core\            # Core Logic (Stats, etc.)
│   └───journal_vault.json       # Local Data (Ignored)
├───project_docs\                # "Harness Engineering" Docs
├───src\
│   ├───app\                     # Layout & Router
│   ├───components\
│   │   ├───features\            # Business Logic Components
│   │   └───menu\                # Navigation
│   ├───pages\                   # Route Components
│   └───index.css                # Global Theme & Tokens
└───GEMINI.md                    # Root Router
```

---

## Data Flow & State
- Frontend calls FastAPI directly via `fetch`.
- Most page behavior uses local React state.
- Journal storage is currently JSON-based (`backend/journal_vault.json`).
- Environment variables for secrets (WeatherAPI) should be in `.env`.

---

## Git Ignore Policy
- **Runtime/Build:** `node_modules/`, `dist/`, `__pycache__/`, `.venv/`.
- **Local Data:** `backend/journal_vault.json` (Runtime-generated).
- **Secrets:** `.env` and `.env.*` (Always keep out of version control).
