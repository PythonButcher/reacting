# PHASE 08 //: TELEMETRY_NEURAL_LOOP
## Live Backend Signals, Console Wiring, And Effect Cleanup

> STATUS: PENDING_AUTHORIZATION  
> DOMAIN: live data synchronization  
> ESTIMATED STEPS: 9 to 11  
> PREREQUISITE: Phase 07

## Mission Brief

`TelemetryCalibrationConsole.jsx` is already one of the strongest pieces of the app. It has dials, levers, counters, status lamps, a diagnostic scope, and an event log. It also has many intentional `Future wiring` comments. This phase turns those comments into a backend-connected neural loop.

The deliverable is a telemetry system where controls can produce requests, the backend can return measured project signals, and the console can display connection state. Depending on operator readiness, this can start with interval polling and graduate to Server-Sent Events.

## Learning Focus

The operator learns `useEffect` as a lifecycle tool for resources outside React: timers, polling loops, event streams, and cleanup functions. The assistant should make cleanup non-negotiable. Every external resource opened by an effect must be closed by that effect.

The Python portion teaches async generators or periodic scanner services if SSE is chosen. If polling is chosen first, it teaches a simpler FastAPI endpoint that accepts calibration parameters and returns normalized telemetry.

## Step Map

| Step | Laboratory Task | Concept |
| --- | --- | --- |
| 1 | Audit `Future wiring` comments | implementation planning from code markers |
| 2 | Define telemetry request and response shapes | contracts before code |
| 3 | Build a backend telemetry service | Python class for scan parameters and normalized output |
| 4 | Add a telemetry router endpoint | FastAPI route and Pydantic models |
| 5 | Build a frontend telemetry service call | API layer consistency |
| 6 | Wire `RUN_CALIBRATION` to the backend | async action state |
| 7 | Replace selected local derived values with backend values | source-of-truth migration |
| 8 | Add connection status to the console | live UX state |
| 9 | Add polling with cleanup or SSE with cleanup | external resource lifecycle |
| 10 | Merge backend events into terminal log | event modeling |
| 11 | Review performance implications | avoiding render storms |

## Target Files

| File | Intent |
| --- | --- |
| `src/components/features/TelemetryCalibrationConsole.jsx` | Connect controls to backend data |
| `src/hooks/useTelemetryLoop.js` | Polling or SSE lifecycle hook |
| `src/services/labApi.js` | Telemetry request functions or stream URL helpers |
| `backend/backend_core/telemetry_service.py` | Calibration and scan service |
| `backend/routers/telemetry.py` | Telemetry API router |
| `backend/backend_core/project_stats.py` | Optional parameterized scan support |

## Assistant Teaching Contract

The assistant should begin with polling unless the operator explicitly wants SSE first. Polling makes the lifecycle visible and easier to debug. SSE can then be introduced as an upgrade path after the operator understands cleanup.

The assistant should preserve the existing console design. The point is to wire the instrument, not redesign it.

## Success Criteria

The phase is complete when at least one console action calls the backend, at least one displayed telemetry value comes from backend computation, connection state is visible, and any timer or stream is cleaned up correctly when the component unmounts.

## Lab Note

A neural loop is not just a wire. It is a feedback cycle: control, measurement, signal, correction. This phase teaches React through that cycle.

