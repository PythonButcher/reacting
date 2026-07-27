# PHASE 03 //: REAGENT_TRANSPORT_LINE
## API Services, Custom Hooks, And Consistent Async React

> STATUS: PENDING_AUTHORIZATION  
> DOMAIN: Frontend architecture and API boundaries  
> ESTIMATED STEPS: 8 to 10  
> PREREQUISITE: Phase 02

## Mission Brief

The current app moves data through several different pipes. `ResearchJournalPage` uses raw `fetch`, `ActiveTestsPage` and `DataInventoryPanel` use `axios`, and `WeatherData` plus `BackendProjectStats` use `useFetchFlask`. The app works, but the reagent transport line is not standardized.

This phase creates a clean frontend API layer and teaches the operator why production React apps keep networking concerns away from page components. The deliverable is not just a new folder. It is a consistent mental model: components render, hooks orchestrate async state, services talk to the backend.

## Learning Focus

The operator learns promises, async/await, loading state, error state, custom hooks, and service modules. The assistant should emphasize that a custom hook is not magic; it is a function that uses React hooks to package reusable behavior.

The Python portion is limited to reading endpoint contracts in `backend/main.py` and `backend/routers/inventory.py`. The operator should understand what the frontend is calling before abstracting those calls.

## Step Map

| Step | Laboratory Task | Concept |
| --- | --- | --- |
| 1 | Inventory all current API call sites | architecture audit |
| 2 | Create an API client base module | base URL, shared config, one source of truth |
| 3 | Add journal service functions | GET, POST, DELETE as named operations |
| 4 | Add inventory, weather, stats, and chat services | domain-oriented function grouping |
| 5 | Build a generic async hook | loading, error, data, refetch |
| 6 | Build a domain hook for journal | hook composition and CRUD behavior |
| 7 | Refactor `ResearchJournalPage` first | moving logic out of pages |
| 8 | Refactor weather and stats next | repeat the pattern with confidence |
| 9 | Refactor inventory calls carefully | file upload and form data differences |
| 10 | Add a short architecture note | operator explains the new data flow |

## Target Files

| File | Intent |
| --- | --- |
| `src/services/apiClient.js` | Shared HTTP client or fetch wrapper |
| `src/services/labApi.js` | Named functions for backend endpoints |
| `src/hooks/useLabAsync.js` | Reusable async state hook |
| `src/hooks/useJournal.js` | Domain hook for journal behavior |
| `src/pages/ResearchJournalPage.jsx` | First refactor target |
| `src/components/features/WeatherData.jsx` | Service-layer migration |
| `src/components/features/BackendProjectStats.jsx` | Service-layer migration |
| `src/components/features/DataInventoryPanel.jsx` | Later migration with upload nuance |

## Assistant Teaching Contract

The assistant should treat this phase as architecture training. Each step should identify the before state, explain the design pressure, then implement one small piece. It should not refactor all call sites in one response.

The assistant should ask the operator to run or inspect each migrated feature before moving on. A service layer that compiles but breaks runtime data is not a successful reagent line.

## Success Criteria

The phase is complete when journal, weather, stats, and inventory calls follow one coherent pattern, pages contain less networking logic, and the operator can explain the separation between service functions and custom hooks.

## Lab Note

The transport line matters because every sample passes through it. Standardize the route, and every later experiment becomes easier to reason about.

