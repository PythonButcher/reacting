# PHASE 06 //: CONTAINMENT_PROTOCOL
## Error Boundaries, Loading Systems, And Recovery UX

> STATUS: PENDING_AUTHORIZATION  
> DOMAIN: resilience and defensive React  
> ESTIMATED STEPS: 7 to 9  
> PREREQUISITE: Phase 05

## Mission Brief

The app currently has several ways to fail: backend offline, missing weather keys, bad upload data, malformed JSON, null response shapes, and local component errors. A laboratory terminal should not collapse into a blank screen when one instrument fails. It should isolate the fault, report it clearly, and keep the rest of the system usable.

This phase builds containment protocols for the UI and API layer. The deliverable is a themed failure system with error boundaries, loading skeletons, retry actions, and predictable API error messages.

## Learning Focus

The operator learns the difference between render-time errors, event-handler errors, failed promises, empty data, and invalid data. The assistant should be precise here because these categories require different fixes.

The Python portion should improve response consistency where appropriate. For example, service methods can return structured results or raise `HTTPException` with meaningful details instead of hiding failures behind generic success/error strings.

## Step Map

| Step | Laboratory Task | Concept |
| --- | --- | --- |
| 1 | Catalog current failure modes | defensive design audit |
| 2 | Build a themed `FaultIndicator` | fallback UI and diagnostic language |
| 3 | Build a `LabErrorBoundary` | React class boundary requirement |
| 4 | Place boundaries around risky panels | containment granularity |
| 5 | Build skeleton states for dashboard instruments | layout stability during loading |
| 6 | Add retry behavior to async hooks | recovery instead of dead ends |
| 7 | Normalize frontend API errors | predictable service-layer exceptions |
| 8 | Improve backend HTTP errors where needed | FastAPI `HTTPException` and status codes |
| 9 | Run failure drills | backend off, bad upload, missing weather key |

## Target Files

| File | Intent |
| --- | --- |
| `src/components/features/FaultIndicator.jsx` | Reusable themed fault display |
| `src/components/features/LabErrorBoundary.jsx` | Error boundary wrapper |
| `src/components/features/LabSkeleton.jsx` | Reusable loading placeholders |
| `src/hooks/useLabAsync.js` | Retry and error normalization |
| `src/app/AppLayout.jsx` | App-level containment placement |
| `backend/routers/inventory.py` | Clearer upload and API registration failures |
| `backend/main.py` or modular routers | Consistent error behavior |

## Assistant Teaching Contract

The assistant should pause before introducing the class component, because error boundaries are the one place modern React still requires class syntax. It should explain that hooks cannot catch render errors in descendant trees.

Each fault drill should be one step. The assistant should ask the operator to intentionally trigger or simulate the failure, observe the result, and only then proceed.

## Success Criteria

The phase is complete when a broken feature panel does not crash the whole app, API failures are visible and recoverable, loading states preserve layout, and the operator can classify common React failure types.

## Lab Note

Containment is not pessimism. It is respect for reality. Instruments fail, networks drop, data arrives malformed, and professional systems remain useful anyway.

