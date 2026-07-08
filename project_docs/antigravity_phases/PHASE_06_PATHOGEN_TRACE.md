# PHASE 06 — PATHOGEN_TRACE
## Error Boundaries, Suspense, and Defensive UI

> **STATUS:** PENDING_AUTHORIZATION
> **DOMAIN:** Resilience & Fault Tolerance
> **ESTIMATED STEPS:** 7–8
> **PREREQUISITE:** Phase 05 — SPECTROMETER_ARRAY

---

## Mission Brief

In any laboratory, containment protocols exist not for when things go *right*, but for when they go *wrong*. A pathogen escapes. A reaction overheats. A sample contaminates the batch. You don't design safety systems during the crisis — you design them before. React applications work the same way: network requests fail, APIs return unexpected shapes, components receive null where they expected an object, and users click things in sequences you never anticipated.

This phase is about making your LAB_TERMINAL **fault-tolerant**. You'll build React Error Boundaries (class components that catch JavaScript errors in the component tree), loading skeletons that maintain spatial layout during data fetches, graceful degradation patterns for when the backend is unreachable, and a centralized `FaultIndicator` component that displays diagnostic error information in the lab aesthetic — not generic white-page crashes, but controlled, informative, on-brand failure states.

---

## What You Will Learn

| Step | Topic | React Concept |
|------|-------|---------------|
| 1 | What breaks React: unhandled errors in the render tree | Runtime exceptions, null dereferencing, failed promises |
| 2 | Error Boundaries: the class component exception | `componentDidCatch`, `getDerivedStateFromError`, fallback UI |
| 3 | Building `LabErrorBoundary` | A reusable, themed error containment wrapper |
| 4 | Building a `FaultIndicator` fallback component | Lab-styled crash screen with error details + retry |
| 5 | Loading skeletons: spatial stability during fetches | Shimmer placeholders, maintaining layout during async |
| 6 | Building `LabSkeleton` — a themed loading system | Pulsing panel skeletons that match actual component dimensions |
| 7 | Graceful degradation: when the backend is cold | Detecting offline state, cached fallback data, retry mechanisms |
| 8 | Wrapping the entire app in layered error boundaries | Strategic boundary placement: per-page vs. per-feature vs. global |

---

## Key Files You Will Touch

| File | Action |
|------|--------|
| `src/components/features/LabErrorBoundary.jsx` | **CREATE** — Reusable error boundary |
| `src/components/features/FaultIndicator.jsx` | **CREATE** — Lab-themed error fallback |
| `src/components/features/LabSkeleton.jsx` | **CREATE** — Loading skeleton system |
| `src/app/AppLayout.jsx` | **MODIFY** — Add top-level error boundary |
| `src/pages/DashboardPage.jsx` | **MODIFY** — Wrap feature panels in boundaries |
| `src/pages/ResearchJournalPage.jsx` | **MODIFY** — Add loading skeletons and error fallbacks |
| `src/hooks/useLabFetch.js` | **MODIFY** — Add retry and offline detection |
| `src/index.css` | **MODIFY** — AI writes fault indicator and skeleton CSS |

---

## Concepts Deep Dive

### Error Boundaries: The One Class Component
React 19 is all about functional components and hooks — except for one critical feature: Error Boundaries. Error Boundaries are class components that implement `static getDerivedStateFromError(error)` and `componentDidCatch(error, errorInfo)`. When any component in their subtree throws during rendering, the boundary catches the error, logs it, and renders a **fallback UI** instead of crashing the entire application. Without an error boundary, a single `TypeError: Cannot read properties of null` in one small widget will white-screen your entire app. With a boundary, only the failing widget shows the fallback — everything else continues working. This is the React equivalent of a biosafety cabinet: contain the hazard, protect the rest.

### Skeleton Loading: Spatial Stability Under Pressure
When your `DashboardPage` loads, there's a moment where the weather data hasn't arrived yet, the project stats are still fetching, and the journal entries are in transit. During that gap, the UI either shows nothing (content layout shift), a generic spinner (uninformative), or a **skeleton** — a shimmer-pulsing placeholder that exactly matches the shape and size of the real content. Skeletons maintain spatial stability, prevent layout shifts, and signal to the user that data is actively loading. In the LAB_TERMINAL aesthetic, your skeletons will pulse with the same `accentPulse` animation already defined in `index.css`, using dimmed panel backgrounds with scanline overlays.

---

## The FaultIndicator (Unique Feature)

Instead of a generic "Something went wrong" message, your `FaultIndicator` will display:

```
┌──────────────────────────────────────────────┐
│  ⚠ CONTAINMENT_BREACH // RENDER_FAULT       │
│                                              │
│  ERROR_CLASS: TypeError                      │
│  MODULE: WeatherData                         │
│  TRACE: Cannot read properties of undefined  │
│         (reading 'temp_f')                   │
│                                              │
│  [■ RETRY_MODULE]    [■ REPORT_FAULT]        │
└──────────────────────────────────────────────┘
```

Fully themed to the lab aesthetic — amber border glow, monospace error traces, mechanical retry buttons. This turns crashes into *diagnostics*.

---

## Architecture Connection

- Currently, **no error boundaries exist** in the codebase. A single null API response crashes the entire app.
- The `try/catch` blocks in `ResearchJournalPage.jsx` and `ActiveTestsPage.jsx` only catch network errors — they don't protect against render-time crashes from malformed data.
- The notification system from Phase 04 integrates here: when a boundary catches an error, it can fire a `FAULT` notification through `NotificationContext`.

---

## Success Criteria
- [ ] You can explain why error boundaries must be class components
- [ ] You can explain the difference between render errors and event handler errors
- [ ] You've built a reusable `LabErrorBoundary` with themed fallback
- [ ] You've built a `FaultIndicator` that displays error diagnostics in lab style
- [ ] You've built `LabSkeleton` loading placeholders for at least 3 component shapes
- [ ] Error boundaries are strategically placed at page and feature levels
- [ ] The app can survive a backend being completely offline without white-screening
- [ ] Network failures trigger retry mechanisms and notification toasts

---

## Lab Notebook Entry
> *"The mark of a professional laboratory isn't that nothing ever goes wrong. It's that when something goes wrong, the containment protocols activate, the failure is isolated, the diagnostics are logged, and the rest of the facility continues operating. Build your UI like a BSL-4 lab."*
