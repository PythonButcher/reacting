# PHASE 10 //: REACTOR_COMMISSIONING
## Performance, Accessibility, Verification, And Long-Term Project Memory

> STATUS: PENDING_AUTHORIZATION  
> DOMAIN: production readiness and learning durability  
> ESTIMATED STEPS: 10 to 12  
> PREREQUISITE: Phase 09

## Mission Brief

Commissioning is where a laboratory system proves it can run as a system, not just as assembled parts. By this phase, LAB_TERMINAL should have guided React learning surfaces, a modular Python backend, service-layer APIs, resilient UI, live telemetry, and an explainable anomaly wing. Now it needs hardening.

The deliverable is a verified, documented, accessible, performant application that remains useful as a learning environment. This phase updates the project memory so future assistant sessions can continue from truth rather than rediscovery.

## Learning Focus

The operator learns build verification, linting, performance profiling, route-level code splitting, accessibility checks, keyboard operation, focus states, and documentation hygiene. The assistant should explain that polish is not decoration; polish is reduced ambiguity.

The Python portion focuses on endpoint verification and service reliability. The backend should be easy to start, easy to inspect, and easy to diagnose when something fails.

## Step Map

| Step | Laboratory Task | Concept |
| --- | --- | --- |
| 1 | Run a full feature inventory | integration audit |
| 2 | Verify frontend build and lint | static feedback loops |
| 3 | Verify backend endpoints manually or with tests | API confidence |
| 4 | Add route-level lazy loading where useful | bundle performance |
| 5 | Profile the telemetry console | render pressure and memoization |
| 6 | Audit keyboard navigation | accessible interaction |
| 7 | Audit labels, live regions, and focus states | screen reader and non-mouse support |
| 8 | Add final lab polish sparingly | animation and tactile feedback |
| 9 | Update architecture documentation | project memory |
| 10 | Update phase completion notes | learning continuity |
| 11 | Create a final operator walkthrough | end-to-end demonstration |
| 12 | Define the next research backlog | future work without scope creep |

## Target Files

| File | Intent |
| --- | --- |
| `src/app/router.jsx` | Lazy loading and route polish if needed |
| `src/components/menu/MenuBar.jsx` | Keyboard and focus audit |
| `src/components/menu/SideBar.jsx` | Keyboard and focus audit |
| `src/components/features/TelemetryCalibrationConsole.jsx` | Performance and accessibility review |
| `src/index.css` | Focus states and restrained animation polish |
| `README.md` | Final setup and architecture truth |
| `project_docs/architecture/FRONTEND_BACKEND.md` | Updated architecture map |
| `project_docs/design/THEME.md` | Updated design conventions if needed |

## Assistant Teaching Contract

The assistant should perform this phase like a commissioning engineer. It should verify before claiming success, record what was checked, and separate true defects from future improvements.

The assistant should also preserve learning continuity. If a context compression or handoff is needed, it should summarize completed phases, open issues, and the exact next step.

## Success Criteria

The phase is complete when the app builds cleanly, major endpoints have been verified, core routes are accessible by keyboard, expensive UI surfaces have been profiled or simplified, and the documentation reflects the real system.

## Lab Note

A reactor is not commissioned when the lights turn on. It is commissioned when the readings are stable, the controls are labeled, the emergency stops work, and the next operator can understand the machine.

