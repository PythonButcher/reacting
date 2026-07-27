# PHASE 04 //: DATA_VAULT_CLEANROOM
## Modular FastAPI, Pydantic Schemas, And Object-Oriented Python Services

> STATUS: PENDING_AUTHORIZATION  
> DOMAIN: Python backend architecture  
> ESTIMATED STEPS: 8 to 11  
> PREREQUISITE: Phase 03

## Mission Brief

The inventory backend already has a cleaner pattern than the journal backend. `routers/inventory.py` delegates registry work to `VaultService`, while `main.py` still owns journal file setup, journal reads, journal writes, weather, stats, and chat registration. This phase moves the backend toward a cleanroom architecture.

The deliverable is a modular backend where persistence logic belongs in service classes, route logic belongs in routers, and request or response shape belongs in Pydantic models. This gives the operator a practical introduction to object-oriented Python without inventing an unrelated example.

## Learning Focus

The operator learns Python classes, constructors, instance methods, private helper methods by convention, Pydantic models, `APIRouter`, and dependency boundaries. The assistant should explain why classes help here: they encapsulate file paths, persistence rules, and reusable operations behind a stable interface.

This phase should keep the implementation conservative. The goal is not to add a database yet. The goal is to make the existing JSON-backed system clear, testable, and ready for future growth.

## Step Map

| Step | Laboratory Task | Concept |
| --- | --- | --- |
| 1 | Compare journal logic with `VaultService` | recognizing architecture patterns |
| 2 | Design `JournalService` | class responsibility and persistence boundary |
| 3 | Move journal file read/write behavior | encapsulation and error handling |
| 4 | Define Pydantic journal schemas | typed request and response contracts |
| 5 | Create `routers/journal.py` | modular FastAPI routing |
| 6 | Register the journal router in `main.py` | app composition |
| 7 | Apply the same thinking to chat | service boundaries and request models |
| 8 | Add experiment persistence backing Phase 02 | backend CRUD for active experiment modules |
| 9 | Add manual endpoint verification steps | disciplined backend validation |
| 10 | Add lightweight unit-test targets if the operator is ready | service-level tests without HTTP complexity |
| 11 | Review what stayed in `main.py` | keeping the entry point clean |

## Target Files

| File | Intent |
| --- | --- |
| `backend/backend_core/journal_service.py` | JSON-backed journal service class |
| `backend/routers/journal.py` | Journal API router |
| `backend/backend_core/experiment_service.py` | Experiment registry service |
| `backend/routers/experiments.py` | Experiment API router |
| `backend/main.py` | Router registration and simplified app entry |
| `backend/backend_core/chat_service.py` | Possible refinement of the existing chat service |

## Assistant Teaching Contract

The assistant should teach one Python class method at a time. It should avoid handing the operator a full backend rewrite. The preferred pattern is to show a small complete method, explain why it exists, then checkpoint before the next method.

The assistant should explain Pydantic with concrete boundary language: incoming JSON is untrusted, the schema is the intake form, and the route should receive validated data.

## Success Criteria

The phase is complete when journal behavior is no longer implemented inline in `main.py`, experiment modules can be persisted through a backend router, and the operator can explain the difference between router code, service code, and schema code.

## Lab Note

A cleanroom does not make the science less powerful. It makes contamination easier to detect. Backend architecture has the same purpose.

