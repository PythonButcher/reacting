# PHASE 03 — CENTRIFUGE_PROTOCOL
## Service Layer, Custom Hooks, and API Abstraction

> **STATUS:** PENDING_AUTHORIZATION
> **DOMAIN:** Architecture & Data Fetching
> **ESTIMATED STEPS:** 7–9
> **PREREQUISITE:** Phase 02 — REAGENT_SYNTHESIS

---

## Mission Brief

A centrifuge doesn't care what's in the tube — it spins, separates, and delivers clean fractions every time. That's what a **service layer** does for your application. Right now, your LAB_TERMINAL has API calls scattered directly inside page components: `ResearchJournalPage` calls `fetch("http://127.0.0.1:8000/api/journal")` inline, `ActiveTestsPage` uses `axios.get(...)` inline, and `WeatherData` uses the `useFetchFlask` hook. Three different patterns for the same job. A centrifuge wouldn't tolerate that inconsistency.

In this phase, you'll build a centralized **API service module** in `src/services/` that abstracts every backend call behind clean functions. Then you'll create **custom hooks** that wrap those service calls with loading, error, and data state — reusable across any component. By the end, your pages will be thin, clean shells that import a hook, destructure the data, and render. The networking logic will be fully separated, testable, and consistent.

---

## What You Will Learn

| Step | Topic | React/JS Concept |
|------|-------|-------------------|
| 1 | Why raw `fetch` in components is a problem | Separation of concerns, DRY principle |
| 2 | Creating an Axios instance with base config | Axios interceptors, base URL, defaults |
| 3 | Building `src/services/labApi.js` | Module pattern, named exports, encapsulation |
| 4 | Service functions: Journal CRUD | `getJournalEntries()`, `createJournalEntry()`, `deleteJournalEntry()` |
| 5 | Service functions: Weather, Stats, Inventory | Completing the full API surface |
| 6 | Building a `useLabFetch` custom hook | Replacing `useFetchFlask` with a robust, generic fetcher |
| 7 | Building `useJournal` — a domain-specific hook | Custom hook that encapsulates journal state + CRUD |
| 8 | Refactoring `ResearchJournalPage` to use `useJournal` | Practical migration from inline fetch to hook |
| 9 | Refactoring `DashboardPage` components | Migrating Weather and Stats to service layer |

---

## Key Files You Will Touch

| File | Action |
|------|--------|
| `src/services/apiClient.js` | **CREATE** — Centralized Axios instance |
| `src/services/labApi.js` | **CREATE** — All backend API functions |
| `src/hooks/useLabFetch.js` | **CREATE** — Generic async data hook |
| `src/hooks/useJournal.js` | **CREATE** — Journal-specific custom hook |
| `src/pages/ResearchJournalPage.jsx` | **MODIFY** — Refactor to use hooks |
| `src/components/features/WeatherData.jsx` | **MODIFY** — Migrate to service layer |
| `src/components/features/BackendProjectStats.jsx` | **MODIFY** — Migrate to service layer |

---

## Concepts Deep Dive

### The Service Layer: Your Lab's Centrifuge
In a properly run laboratory, you don't walk to the spectrometer every time you need a reading — you have a standardized sample submission protocol. The service layer works the same way. Instead of every component knowing the backend URL, the HTTP method, the error handling pattern, and the response parsing logic, you centralize all of that in one place. `labApi.getWeather()` becomes a clean, testable function that any component can call. If the backend URL changes, you update one file. If you need to add authentication headers, you configure the Axios instance once. This is the **Single Responsibility Principle** applied to data fetching.

### Custom Hooks: Reusable Laboratory Protocols
A custom hook is a function that starts with `use` and can call other hooks inside it. Think of it as a written protocol that any researcher can follow. `useJournal()` returns `{ entries, isLoading, error, createEntry, deleteEntry }` — everything a component needs to interact with the journal system. The component doesn't know or care *how* the data is fetched. It just follows the protocol. This pattern is wildly powerful because it lets you encapsulate complex async logic (loading states, error handling, optimistic updates, refetching) into a reusable unit that any page or component can import.

---

## Architecture Connection

This phase directly addresses two architectural notes from `FRONTEND_BACKEND.md`:
- **"`useFetchFlask` hook for simple GET requests"** — You'll replace this with a more robust `useLabFetch` hook that supports POST, DELETE, error recovery, and refetching.
- **"Future: API calls should move to a service layer"** — This phase IS that future. You're building the `src/services/` directory that the architecture doc anticipates.

The existing `src/services/` directory is currently **empty** — it's waiting for exactly this work.

---

## Success Criteria
- [ ] You have a centralized Axios instance with base URL configuration
- [ ] All backend API calls are abstracted into `src/services/labApi.js`
- [ ] You've built a generic `useLabFetch` hook that handles loading, error, and data
- [ ] You've built a domain-specific `useJournal` hook with full CRUD operations
- [ ] `ResearchJournalPage` no longer contains any direct `fetch()` calls
- [ ] Weather and Stats components use the service layer
- [ ] You can explain why custom hooks must start with `use`

---

## Lab Notebook Entry
> *"The centrifuge doesn't discriminate. It accepts any sample, applies the same rotational protocol, and delivers separated fractions with clinical consistency. Your service layer is that centrifuge — one protocol, every sample, clean results every time."*
