# PHASE 05 — BIDIRECTIONAL HANDSHAKE
## Data Transmission and Schema Validation

> **STATUS:** PENDING_AUTHORIZATION  
> **DOMAIN:** FastAPI POST routes and React fetch  
> **ESTIMATED STEPS:** 6  
> **PREREQUISITE:** Completion of Phase 04

---

## Mission Brief
A control fader is useless if the system doesn't know its position. We will implement a secure POST sequence to transmit our precision data back to the server, ensuring it meets strict validation rules.

---

## What You Will Learn

| Step | Topic | Python & React Concept |
|------|-------|---------------|
| 1 | Define the `FaderData` Pydantic model | Backend data validation |
| 2 | Create the POST route in FastAPI | Receiving data |
| 3 | Log the received value | Backend verification |
| 4 | Write the POST `fetch` in React | Asynchronous transmission |
| 5 | Trigger the fetch on fader `mouseUp` | Action coupling |
| 6 | Add visual transmission feedback | UI state updates |

---

## Key Files You Will Touch

| File | Action |
|------|--------|
| `backend/main.py` | **MODIFY** — New POST endpoint |
| `src/components/features/PrecisionFader.jsx` | **MODIFY** — Adding the transmit logic |

---

## Concepts Deep Dive

### Sending Data with POST
Unlike a GET request which only asks for data, a POST request sends data in the "body" of the HTTP request. In React, we use the `fetch` API, set the method to `"POST"`, and convert our JavaScript object into a JSON string using `JSON.stringify()`.

### Pydantic Schemas
In Python, we cannot trust that the client sent us the right data type. Pydantic is a library used heavily in FastAPI that validates incoming data. By defining a schema class, FastAPI will automatically reject requests that contain invalid types (e.g., sending a string instead of an integer) before it even hits your function logic.

---

## Success Criteria
- [ ] You can define a Pydantic schema in FastAPI
- [ ] You can successfully write a POST route
- [ ] You can execute a POST fetch from React
- [ ] Dragging the fader and releasing it results in the backend terminal logging the updated value.

---

## Lab Notebook Entry
> *"Trust nothing from the client. Pydantic is the shield that protects your backend logic from malformed frontend state."*
