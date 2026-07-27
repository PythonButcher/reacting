# PHASE 07 //: MENTOR_CORE_UPLINK
## Research Chatbot, Guided Learning State, And Backend Response Design

> STATUS: PENDING_AUTHORIZATION  
> DOMAIN: React interaction design and Python service behavior  
> ESTIMATED STEPS: 8 to 10  
> PREREQUISITE: Phase 06

## Mission Brief

The dashboard already has a Research Chatbot UI, and the backend already has `/api/chat`, but the frontend currently simulates a response with `setTimeout`. This phase connects the visible assistant to the FastAPI service and turns it into a practical guided-learning console for the operator.

The deliverable is not a general chatbot. It is a Mentor Core: a lab-themed assistant surface that can acknowledge the current phase, summarize the next step, explain a React or Python concept, and reinforce the one-step-at-a-time protocol.

## Learning Focus

The operator learns chat state arrays, optimistic UI, async submit handlers, `useRef` scrolling, request/response shapes, and backend service design. The assistant should explain why chat UIs are mostly state machines: idle, composing, submitting, streaming or waiting, succeeded, failed.

The Python portion teaches how a service class can transform a message into a structured response. If a real model integration is added later, this phase still creates the local service boundary that would protect the frontend from provider details.

## Step Map

| Step | Laboratory Task | Concept |
| --- | --- | --- |
| 1 | Compare simulated chat with backend `/api/chat` | frontend/backend mismatch audit |
| 2 | Design a response contract | message text, status, version, teaching mode |
| 3 | Move submit logic to the API service layer | async handler boundaries |
| 4 | Replace `setTimeout` with a real backend call | loading state and error state |
| 5 | Add guided-learning metadata to responses | backend service shaping UI behavior |
| 6 | Add phase-aware quick prompts | controlled commands without prompt clutter |
| 7 | Add failure handling through Containment Protocol | fault display and retry |
| 8 | Add transcript persistence option | journal integration or local buffer |
| 9 | Teach prompt boundaries and response pacing | safe assistant behavior |
| 10 | Verify accessibility of the chat terminal | focus, labels, live region behavior |

## Target Files

| File | Intent |
| --- | --- |
| `src/components/features/ResearchChatbot.jsx` | Replace simulation with backend integration |
| `src/services/labApi.js` | Add chat request function |
| `backend/backend_core/chat_service.py` | Expand structured response behavior |
| `backend/main.py` or `backend/routers/chat.py` | Modularize chat endpoint if Phase 04 prepared it |
| `src/components/features/FaultIndicator.jsx` | Reuse for chat failures |

## Assistant Teaching Contract

The assistant should keep the chat feature bounded. It should not pretend this is a fully autonomous coding agent. It should teach the operator how the UI, request payload, service class, and response rendering connect.

When discussing prompt behavior, the assistant should avoid huge prompt templates. It should use clean text, short sections, and practical examples that match the project harness.

## Success Criteria

The phase is complete when the chat UI calls the backend, handles loading and failure cleanly, renders useful guided-learning responses, and the operator can explain the full path from form submission to Python service response and back to React state.

## Lab Note

An assistant embedded in a laboratory terminal should not be a novelty panel. It should be part of the instrument: explain the next action, preserve pacing, and make the operator more capable.

