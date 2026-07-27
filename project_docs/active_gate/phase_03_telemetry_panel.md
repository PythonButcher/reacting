# ACTIVE GATE //: PHASE 03 — TELEMETRY PANEL (REACT SIDE EFFECTS)

> **SOURCE OF TRUTH:** `project_docs/antigravity_phase_plan.md`
> **STATUS:** IN_PROGRESS
> **GATE:** Phase 03

---

## Phase 3: Telemetry Panel (React Side Effects & Data Fetching)
**Objective:** Construct a live terminal display panel that fetches system telemetry data from our FastAPI backend using `useEffect` and `axios`.
**Learning Focus:** React side effects (`useEffect`), asynchronous state management (`data`, `isLoading`, `error`), and backend integration.

---

## Active Implementation Steps

### Step 1 — Telemetry Panel Component & State Layout
- **Target File:** `src/components/features/TelemetryPanel.jsx`
- **Goal:** Create base functional component with `useState` hooks for `telemetryData`, `isLoading`, and `error`.

### Step 2 — Asynchronous Data Fetching Hook (`useEffect`)
- **Target File:** `src/components/features/TelemetryPanel.jsx`
- **Goal:** Implement `useEffect` with `axios.get('http://127.0.0.1:8000/api/telemetry/uptime')` to fetch live data on mount.

### Step 3 — Skeuomorphic Mechanical CSS Styling
- **Target File:** `src/index.css`
- **Goal:** Apply terminal readout styling (monospaced grid, pulse indicators, dark panel skin).

### Step 4 — Parent Integration & Live Verification (TRUE FINISH GOAL)
- **Target File:** `src/pages/ActiveTestsPage.jsx`
- **Goal:** Import `<TelemetryPanel />` into `ActiveTestsPage.jsx`, mount it next to the hardware controls, and verify live backend data rendering in the browser.

---

*Upon completion of Step 4, this file will be moved to `project_docs/archive/`.*
