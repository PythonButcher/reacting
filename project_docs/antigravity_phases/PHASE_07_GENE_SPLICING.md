# PHASE 07 — GENE_SPLICING
## Backend Expansion: New OO Services, Routers, and Schemas

> **STATUS:** PENDING_AUTHORIZATION
> **DOMAIN:** Python / FastAPI Backend
> **ESTIMATED STEPS:** 8–10
> **PREREQUISITE:** Phase 06 — PATHOGEN_TRACE

---

## Mission Brief

Gene splicing takes existing genetic material and introduces new sequences — expanding the organism's capabilities without breaking what already works. This phase does the same to your Python backend. The current FastAPI application is functional but monolithic: `main.py` handles journal CRUD inline, weather routing is a flat function, and the only properly modularized piece is `routers/inventory.py` with its `VaultService`.

You'll learn **Object-Oriented Python** in the context of real web service architecture. You'll build new `APIRouter` modules, Pydantic schemas for request/response validation, dedicated service classes that encapsulate business logic, and entirely new backend capabilities: an **Experiment Registry** that tracks experiment metadata, a **System Health** endpoint that reports backend diagnostics, and a **Telemetry Persistence** layer that saves calibration snapshots from the frontend console.

---

## What You Will Learn

| Step | Topic | Python/FastAPI Concept |
|------|-------|------------------------|
| 1 | OOP fundamentals: Classes, `__init__`, encapsulation | Python class syntax, instance methods, `self` |
| 2 | Why `VaultService` is a good pattern | Studying the existing service class as a reference |
| 3 | Pydantic models: Request validation | `BaseModel`, field types, automatic validation |
| 4 | Pydantic models: Response schemas | Structured API responses, serialization |
| 5 | `APIRouter`: Modular route registration | Creating isolated route groups, prefix mounting |
| 6 | Building `ExperimentService` | OO service for experiment CRUD + persistence |
| 7 | Building `routers/experiments.py` | Full REST router: GET, POST, PUT, DELETE |
| 8 | Building `SystemHealthService` | Backend uptime, memory, Python version, dependency check |
| 9 | Building `routers/health.py` | System diagnostics endpoint |
| 10 | Building `TelemetrySnapshotService` | Save/load calibration state from the frontend console |

---

## Key Files You Will Touch

| File | Action |
|------|--------|
| `backend/backend_core/experiment_service.py` | **CREATE** — OO experiment management service |
| `backend/backend_core/health_service.py` | **CREATE** — System health diagnostics |
| `backend/backend_core/telemetry_service.py` | **CREATE** — Telemetry snapshot persistence |
| `backend/routers/experiments.py` | **CREATE** — Experiment REST router |
| `backend/routers/health.py` | **CREATE** — Health check router |
| `backend/routers/telemetry.py` | **CREATE** — Telemetry snapshot router |
| `backend/main.py` | **MODIFY** — Register new routers |
| `backend/requirements.txt` | **MODIFY** — Add `psutil` for health metrics |

---

## Concepts Deep Dive

### Object-Oriented Python: Why Classes for Services?
The existing `VaultService` in `backend_core/vault_service.py` is a perfect example of OOP done right. It has a constructor (`__init__`) that sets up the file paths. It has private methods (`_read_registry`, `_write_registry`) that handle low-level I/O. It has public methods (`get_all_assets`, `register_asset`, `remove_asset`) that define the API contract. The class encapsulates all the complexity of JSON file management behind a clean interface. Your routes don't know or care that data is stored in a JSON file — they call `vault_service.get_all_assets()` and get a list. This is the **Single Responsibility Principle**: the service manages data, the router manages HTTP, the schema manages validation. Three concerns, three modules, zero entanglement.

### Pydantic: Type-Safe Boundaries at the API Edge
FastAPI's superpower is Pydantic integration. When you define `class ExperimentPayload(BaseModel): name: str; hypothesis: str; status: str = "PENDING"`, FastAPI automatically validates incoming JSON, rejects requests with missing fields, converts types, and generates OpenAPI documentation. This is your laboratory's intake form — before any sample enters the system, it must meet the schema. No malformed data gets past the boundary. You'll build request schemas (what the frontend sends), response schemas (what the backend returns), and learn how Pydantic's automatic validation eliminates entire categories of bugs.

---

## New Backend Capabilities

### 1. Experiment Registry
A full CRUD system for managing experiment metadata:
- **POST** `/api/experiments` — Create a new experiment with name, hypothesis, status
- **GET** `/api/experiments` — List all experiments with filtering
- **PUT** `/api/experiments/{id}` — Update experiment status, add results
- **DELETE** `/api/experiments/{id}` — Archive/remove an experiment

### 2. System Health
A diagnostics endpoint that reports backend vital signs:
- **GET** `/api/health` — Returns uptime, Python version, memory usage, disk space, loaded router count, request count

### 3. Telemetry Snapshots
Persistence for the Telemetry Calibration Console:
- **POST** `/api/telemetry/snapshot` — Save current calibration state
- **GET** `/api/telemetry/snapshots` — List saved snapshots
- **GET** `/api/telemetry/snapshot/{id}` — Load a specific snapshot

---

## Architecture Connection

This phase follows the mandate from `AGENT_PROTOCOL.md`:
- **"Strictly follow Object-Oriented (OO) patterns for Python logic (classes, encapsulation, clear interfaces)"**
- **"Utilize modular patterns such as FastAPI's APIRouter to isolate routes, delegate data logic to dedicated controllers/services, and use clear schemas"**

The existing `routers/inventory.py` and `backend_core/vault_service.py` are the structural templates. You'll replicate and extend that pattern.

---

## Success Criteria
- [ ] You can define a Python class with `__init__`, instance methods, and encapsulation
- [ ] You understand how `VaultService` separates data logic from routing
- [ ] You can build Pydantic models for request validation and response serialization
- [ ] You've built a complete `ExperimentService` with CRUD operations
- [ ] You've built a modular `APIRouter` and registered it in `main.py`
- [ ] The `/api/health` endpoint returns live backend diagnostics
- [ ] Telemetry snapshots can be saved and loaded from the frontend console
- [ ] All new backend code follows OO patterns — no loose functions in router files

---

## Lab Notebook Entry
> *"Gene splicing doesn't replace the organism. It introduces new sequences into the existing genome, expanding capability without breaking function. Your backend is the genome. New services are the spliced sequences. The organism grows stronger."*
