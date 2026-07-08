# PHASE 09 — CHRONO_DISPLACEMENT
## Performance Optimization, useReducer, and Code Splitting

> **STATUS:** PENDING_AUTHORIZATION
> **DOMAIN:** Advanced React Patterns & Optimization
> **ESTIMATED STEPS:** 8–10
> **PREREQUISITE:** Phase 08 — NEURAL_BRIDGE

---

## Mission Brief

Chrono displacement isn't time travel — it's the ability to bend time *perception*. A 200ms render feels instant. A 2-second render feels broken. The difference isn't in the data or the features — it's in how efficiently the system processes them. By this point in the project, your LAB_TERMINAL has grown substantially: multiple pages, live streaming, context providers, service layers, visualization components, error boundaries. This growth introduces performance concerns that didn't exist when the app was three components and a fetch call.

This phase teaches you to **measure, diagnose, and optimize** React performance. You'll replace the Telemetry Console's 12+ `useState` declarations with a single `useReducer` — a pattern borrowed from Redux that centralizes state transitions. You'll use `React.memo` to prevent unnecessary child re-renders. You'll implement `React.lazy` and `Suspense` to code-split heavy pages (the 657-line TelemetryCalibrationConsole doesn't need to load when you're viewing the Dashboard). And you'll learn to profile your app using React DevTools to find and fix actual bottlenecks instead of guessing.

---

## What You Will Learn

| Step | Topic | React Concept |
|------|-------|---------------|
| 1 | The re-render problem at scale | Why component trees re-render, render cascades |
| 2 | React DevTools Profiler | Measuring render times, identifying hot components |
| 3 | `React.memo` — preventing unnecessary re-renders | Shallow comparison, when to memoize components |
| 4 | `useReducer` — centralized state machine | Actions, dispatchers, reducers, replacing many `useState` calls |
| 5 | Refactoring TelemetryCalibrationConsole to `useReducer` | Replacing 12+ state hooks with a single reducer |
| 6 | `React.lazy` and `Suspense` — code splitting | Dynamic imports, route-level lazy loading |
| 7 | Implementing lazy routes in `router.jsx` | Wrapping page imports with `React.lazy` |
| 8 | Debouncing and throttling in React | `useDeferredValue`, debounced inputs, throttled updates |
| 9 | Optimizing the SSE stream consumer | Batching state updates, preventing render storms |
| 10 | Building a `PerformanceMonitor` dev panel | In-app render counter, FPS display, memory readout |

---

## Key Files You Will Touch

| File | Action |
|------|--------|
| `src/components/features/TelemetryCalibrationConsole.jsx` | **MAJOR REFACTOR** — `useReducer` migration |
| `src/app/router.jsx` | **MODIFY** — Lazy loading all page routes |
| `src/components/features/PerformanceMonitor.jsx` | **CREATE** — Dev-mode performance readout |
| `src/hooks/useTelemetryStream.js` | **MODIFY** — Optimize with batched updates |
| Multiple child components | **MODIFY** — Wrap with `React.memo` where appropriate |
| `src/index.css` | **MODIFY** — AI writes performance panel CSS |

---

## Concepts Deep Dive

### useReducer: The State Machine Control Panel
The TelemetryCalibrationConsole currently has 12 individual `useState` calls: `scanIntensity`, `anomalySensitivity`, `stabilityTrim`, `minDepth`, `maxDepth`, `fileFocus`, `refreshCadence`, `diagnosticMode`, `verboseLogging`, `telemetryBusOnline`, `isolationRelayClosed`, `isControlArmed`. Each has its own setter. Each setter triggers a separate re-render. When the user clicks "RESET_TELEMETRY", the handler calls 11 setters in sequence — that's potentially 11 re-renders in one user action. `useReducer` replaces all of this with a single state object and a `dispatch` function. Instead of `setScanIntensity(64)`, you dispatch `{ type: 'SET_SCAN_INTENSITY', payload: 64 }`. Instead of 11 reset calls, you dispatch `{ type: 'RESET_ALL' }` and the reducer returns the full default state in one operation. One state transition, one re-render. The reducer is a pure function — given the same state and action, it always returns the same new state. This makes state transitions predictable, debuggable, and centralized.

### React.lazy: Loading Modules on Demand
When your app bundles, every `import` at the top of `router.jsx` gets included in the initial JavaScript payload. The user downloads and parses ALL pages before they can even see the Dashboard. `React.lazy(() => import('../pages/TelemetryCalibrationPage'))` tells the bundler: "Don't include this in the main bundle. Create a separate chunk. Load it only when the user navigates to that route." Combined with `<Suspense fallback={<LabSkeleton />}>`, the user sees a loading skeleton while the chunk downloads. On a fast connection, this is imperceptible. On a slow one, it's the difference between a 3-second initial load and a 1-second one. This is called **code splitting**, and it's how production React apps handle large codebases.

---

## The useReducer Migration

### Before (current TelemetryCalibrationConsole):
```javascript
const [scanIntensity, setScanIntensity] = useState(64);
const [anomalySensitivity, setAnomalySensitivity] = useState(58);
const [stabilityTrim, setStabilityTrim] = useState(42);
// ... 9 more useState calls

const handleTelemetryReset = () => {
  setScanIntensity(64);
  setAnomalySensitivity(58);
  setStabilityTrim(42);
  // ... 8 more setter calls = multiple re-renders
};
```

### After (useReducer):
```javascript
const [state, dispatch] = useReducer(telemetryReducer, DEFAULT_CONSOLE_STATE);

// In the reducer:
case 'RESET_ALL':
  return { ...DEFAULT_CONSOLE_STATE };  // One operation, one re-render
```

---

## The PerformanceMonitor (Unique Feature)

A development-mode overlay in the bottom corner of the screen that displays:
- **Render count** per component (tracked via `useRef`)
- **FPS** calculated from `requestAnimationFrame`
- **Memory** from `performance.memory` (Chrome only)
- **Bundle size** awareness from dynamic imports

Styled as a compact lab instrument — think: a small oscilloscope readout permanently mounted to the bench. Only visible in development mode (`import.meta.env.DEV`).

---

## Success Criteria
- [ ] You can use React DevTools Profiler to identify slow-rendering components
- [ ] You can explain when `React.memo` helps and when it doesn't
- [ ] You've migrated the TelemetryCalibrationConsole from 12+ `useState` to `useReducer`
- [ ] The reducer handles all state transitions including RESET_ALL
- [ ] All page routes use `React.lazy` with `Suspense` fallbacks
- [ ] SSE stream consumption is optimized to prevent render storms
- [ ] You've built a `PerformanceMonitor` dev panel
- [ ] You understand debouncing/throttling for high-frequency inputs

---

## Lab Notebook Entry
> *"Chrono displacement isn't about moving faster — it's about the perception of speed. A 200ms render and a 2000ms render contain the same data. The difference is in how the system processes it. Optimization isn't a feature — it's the elimination of waste."*
