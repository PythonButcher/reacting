# PHASE 08 — NEURAL_BRIDGE
## Real-Time Data Streams: SSE, Live Telemetry, and Streaming UI

> **STATUS:** PENDING_AUTHORIZATION
> **DOMAIN:** Real-Time Communication
> **ESTIMATED STEPS:** 8–10
> **PREREQUISITE:** Phase 07 — GENE_SPLICING

---

## Mission Brief

Every instrument in the Telemetry Calibration Console currently says `"Future wiring"` in its comments. Seventeen times. The dials spin, the levers click, the scope traces animate — but none of it connects to the backend. The console is a beautifully crafted cockpit with no airplane attached. This phase builds the neural bridge.

**Server-Sent Events (SSE)** are a browser-native, one-way streaming protocol where the server pushes events to the client in real time. Unlike WebSockets (bidirectional, complex), SSE is simple, HTTP-based, and perfect for telemetry feeds — the server streams data, the client listens and renders. You'll build a FastAPI SSE endpoint that streams live project telemetry, a React hook that consumes the stream, and wire the Telemetry Console's scope, gauges, and event log to display real backend data instead of local-only derived values.

---

## What You Will Learn

| Step | Topic | Concept |
|------|-------|---------|
| 1 | HTTP request/response vs. streaming protocols | Polling, long-polling, SSE, WebSockets — when to use which |
| 2 | Server-Sent Events: the protocol | `text/event-stream`, event format, `data:`, `event:`, `id:` fields |
| 3 | Building a FastAPI SSE endpoint | `StreamingResponse`, async generators, `yield` syntax |
| 4 | Building a `TelemetryStreamService` backend | OO service that scans project stats on an interval |
| 5 | The `EventSource` browser API | Creating a client-side SSE connection, event listeners |
| 6 | Building a `useTelemetryStream` custom hook | React hook that manages an EventSource lifecycle |
| 7 | Wiring the Diagnostic Scope to live data | Replacing `telemetryModel` derived values with streamed data |
| 8 | Wiring the Terminal Event Log to backend events | Streaming operational events into the event log panel |
| 9 | Connection state management | Reconnection, heartbeat, connection status indicators |
| 10 | Building a `ConnectionStatusBar` component | Visual indicator: CONNECTED / RECONNECTING / OFFLINE |

---

## Key Files You Will Touch

| File | Action |
|------|--------|
| `backend/backend_core/telemetry_stream_service.py` | **CREATE** — OO streaming telemetry service |
| `backend/routers/telemetry_stream.py` | **CREATE** — SSE streaming endpoint |
| `src/hooks/useTelemetryStream.js` | **CREATE** — EventSource consumer hook |
| `src/components/features/ConnectionStatusBar.jsx` | **CREATE** — Live connection indicator |
| `src/components/features/TelemetryCalibrationConsole.jsx` | **MODIFY** — Wire to live data |
| `src/services/labApi.js` | **MODIFY** — Add telemetry stream URL |
| `backend/main.py` | **MODIFY** — Register stream router |
| `src/index.css` | **MODIFY** — AI writes connection status CSS |

---

## Concepts Deep Dive

### SSE: The Laboratory Data Bus
In a real laboratory, instruments don't wait for you to ask for a reading — they continuously output data on a shared bus. A temperature probe streams readings. A mass spectrometer emits continuous spectral data. SSE works the same way. The server opens a persistent HTTP connection and pushes `text/event-stream` data down the wire. The client receives events as they arrive — no polling, no repeated requests, no wasted bandwidth. The `EventSource` API is built into every modern browser: `const stream = new EventSource('/api/telemetry/stream')`. It automatically reconnects on disconnection. It's simpler than WebSockets and perfect for one-directional data flows like telemetry.

### The EventSource Lifecycle in React
An `EventSource` is a browser-level resource — like a WebSocket or a timer. In React, resources that exist outside the render cycle must be managed inside `useEffect`. You create the `EventSource` on mount, attach event listeners, parse incoming data with `JSON.parse`, update state with the parsed values, and critically — **close the connection in the cleanup function** when the component unmounts. If you forget cleanup, you'll have ghost connections accumulating every time the user navigates away and back. This is the same lifecycle pattern as `setInterval` from Phase 02, but with a real network stream instead of a local timer.

---

## What Gets Wired

The TelemetryCalibrationConsole has **17 "Future wiring" comments**. This phase addresses the most impactful ones:

| Console Element | Current State | After Phase 08 |
|----------------|---------------|----------------|
| Diagnostic Scope traces | Local `useMemo` derived values | Live streamed scan/load/stability data |
| Terminal Event Log | Local-only `createLogEntry` events | Mix of local actions + backend stream events |
| Status Light Rail | Hardcoded statuses | Live backend health: BUS, GUARD, TRACE thresholds |
| Counter Readouts | Local `useState` counters | Synced with backend calibration metadata |
| Connection indicator | Does not exist | New `ConnectionStatusBar` with CONNECTED/OFFLINE |

---

## Backend Stream Architecture

```python
# Simplified SSE flow:
async def telemetry_generator():
    while True:
        stats = scan_project_stats(PROJECT_ROOT)
        health = get_system_health()
        yield f"data: {json.dumps({'stats': stats, 'health': health})}\n\n"
        await asyncio.sleep(5)  # 5-second heartbeat
```

The stream emits a JSON payload every N seconds containing fresh telemetry. The frontend hook parses each event and updates component state, which triggers re-renders of the scope, gauges, and log.

---

## Success Criteria
- [ ] You can explain the difference between polling, SSE, and WebSockets
- [ ] You've built a FastAPI SSE endpoint with `StreamingResponse`
- [ ] You've built a `useTelemetryStream` hook using `EventSource`
- [ ] The hook properly cleans up the connection on unmount
- [ ] The Diagnostic Scope renders live backend data instead of local derived values
- [ ] The Terminal Event Log displays backend-streamed events
- [ ] A `ConnectionStatusBar` shows live connection state
- [ ] The stream auto-reconnects on disconnection
- [ ] You understand the `useEffect` cleanup pattern for external resources

---

## Lab Notebook Entry
> *"A neural bridge doesn't merely connect — it transmits continuously, in real time, without being asked. It turns a disconnected cockpit into a live instrument panel. SSE is the neural bridge between your backend's data stream and your frontend's visual cortex."*
