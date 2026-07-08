# PHASE 02 — DATA MATRIX API
## Backend Engine Construction and Data Ingestion

> **STATUS:** PENDING_AUTHORIZATION
> **DOMAIN:** FastAPI routing and Python data structures
> **ESTIMATED STEPS:** 5
> **PREREQUISITE:** Completion of Phase 01

---

## Mission Brief

A terminal is only as useful as the data it displays. In this phase, we step into the backend to engineer a robust engine that generates complex, nested system data. This mimics a real-world scenario where the frontend must process a rich payload from an external service.

---

## What You Will Learn

| Step | Topic | Python Concept |
|------|-------|---------------|
| 1 | Define the `@app.get("/api/matrix")` route | FastAPI routing decorators |
| 2 | Construct the mock payload generator | Python dicts and lists |
| 3 | Connect the generator to the route | Request/Response cycle |
| 4 | Test the endpoint directly | API validation via URL/Swagger |
| 5 | Review JSON serialization | Data transport theory |

---

## Key Files You Will Touch

| File | Action |
|------|--------|
| `backend/main.py` | **MODIFY** — Registration of the new matrix endpoint |
| `backend/backend_core/matrix_engine.py` | **CREATE** — New module to hold the data generation logic |

---

## Concepts Deep Dive

### What is a FastAPI Route?
A route is an entry point into your backend. When the React app asks for data, it sends an HTTP request (like a `GET` request) to a specific URL path. FastAPI uses Python decorators like `@app.get("/api/matrix")` to map that URL path directly to a Python function. When the URL is hit, the function runs.

### JSON Serialization
Python uses dictionaries and lists to store complex data. Web browsers use JSON (JavaScript Object Notation) to transmit data. FastAPI automatically handles the translation (serialization) between your Python dictionary and the JSON string that the frontend receives. You don't have to manually format the string; you just return a dictionary.

---

## Example Teaching Format (What Steps Will Look Like)

```
### Step 1 — Defining the Route
* **Key Concept:** [Two paragraphs explaining the Python topic]
* **Code Implementation:** [Complete, paste-ready Python skeleton]
* **CHECKPOINT:** "Does your endpoint run without syntax errors? Type PROCEED for Step 2."
```

---

## Success Criteria
- [ ] You can explain what a GET request does
- [ ] You can write a Python dictionary with nested lists
- [ ] You have successfully registered a new route in `main.py`
- [ ] The endpoint successfully returns a complex JSON payload at `http://127.0.0.1:8000/api/matrix`

---

## Lab Notebook Entry
> *"Separation of concerns begins here. The frontend should never know how the data is generated, only how to ask for it. The API is the contract."*
