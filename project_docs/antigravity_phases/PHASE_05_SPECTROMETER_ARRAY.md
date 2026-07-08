# PHASE 05 — SPECTROMETER_ARRAY
## Data Visualization, Derived State, and Memoization

> **STATUS:** PENDING_AUTHORIZATION
> **DOMAIN:** Performance Hooks & Data Display
> **ESTIMATED STEPS:** 8–10
> **PREREQUISITE:** Phase 04 — CONTAINMENT_FIELD

---

## Mission Brief

A spectrometer takes raw light and breaks it into a spectrum — transforming invisible data into visible, actionable information. That's exactly what this phase does. You have raw backend data: file counts, byte sizes, journal entries, weather readings, telemetry values. But raw numbers on a screen aren't insight. A bar chart showing file type distribution *is*. A gauge showing system load *is*. A sparkline showing journal activity over time *is*.

This phase teaches you to **derive**, **transform**, and **visualize** data using React's performance hooks (`useMemo`, `useCallback`) and pure CSS/SVG-based charting. No chart libraries — you'll hand-build laboratory instruments that render data visually: analog gauges, bar spectra, signal traces, and distribution plots. This is where the LAB_TERMINAL starts looking like actual scientific instrumentation instead of a text terminal.

---

## What You Will Learn

| Step | Topic | React Concept |
|------|-------|---------------|
| 1 | Why recomputation is expensive | Render cycles, referential equality, when React re-renders |
| 2 | `useMemo` — caching derived values | Memoizing computations, dependency arrays for expensive calcs |
| 3 | `useCallback` — stabilizing function references | Preventing child re-renders from changing function props |
| 4 | Studying the existing `telemetryModel` | Reading the TelemetryCalibrationConsole's `useMemo` computation |
| 5 | Building a `BarSpectrograph` component | CSS-only horizontal bar chart for file type distribution |
| 6 | Building an `AnalogGauge` component | SVG-based circular gauge with needle rotation |
| 7 | Building a `SignalTrace` sparkline | CSS/SVG mini line chart for time-series data |
| 8 | Building a `DistributionMatrix` heatmap | Grid-based visualization of file sizes by type |
| 9 | Composing a `SpectrumAnalyzerPanel` page | New route: `/spectrum` — a dedicated data visualization dashboard |
| 10 | Wiring the panel to live backend stats | Connecting `labApi.getStats()` → memoized transforms → visual components |

---

## Key Files You Will Touch

| File | Action |
|------|--------|
| `src/components/features/BarSpectrograph.jsx` | **CREATE** — File type distribution bars |
| `src/components/features/AnalogGauge.jsx` | **CREATE** — SVG circular gauge instrument |
| `src/components/features/SignalTrace.jsx` | **CREATE** — Sparkline trace component |
| `src/components/features/DistributionMatrix.jsx` | **CREATE** — Heatmap grid visualization |
| `src/pages/SpectrumAnalyzerPage.jsx` | **CREATE** — New route page |
| `src/app/router.jsx` | **MODIFY** — Add `/spectrum` route |
| `src/components/menu/MenuBar.jsx` | **MODIFY** — Add navigation link |
| `src/index.css` | **MODIFY** — AI writes gauge, bar, trace CSS |

---

## Concepts Deep Dive

### useMemo: The Pre-Computed Spectrum
Every time a component re-renders, all the code inside its function body runs again. If you have a computation like `const distribution = Object.entries(stats.file_type_distribution).sort((a, b) => b[1] - a[1])` — that sort runs on every render, even if `stats` hasn't changed. `useMemo(() => expensiveSort(stats), [stats])` tells React: "Only recompute this when `stats` actually changes. Otherwise, return the cached result." The `TelemetryCalibrationConsole` already uses this pattern for its `telemetryModel` — a derived object computed from 11 state variables. You'll study that implementation, then build your own memoized data transforms.

### useCallback: Stabilizing the Emission Lines
`useCallback` solves a subtler problem. Every time a parent re-renders, any inline function like `onClick={() => doThing(id)}` creates a *new function reference*. If that function is passed as a prop to a child component, the child sees a "new" prop and re-renders — even though the function's behavior hasn't changed. `useCallback` memoizes the function itself, returning the same reference across renders unless its dependencies change. The existing `appendEvent` in `TelemetryCalibrationConsole` uses `useCallback` for exactly this reason — it's passed to many child event handlers and shouldn't cause unnecessary re-renders.

---

## Visualization Instruments You Will Build

### 1. BarSpectrograph
A horizontal bar chart resembling a spectrometer readout. Each bar represents a file type (`.jsx`, `.py`, `.css`, `.md`), color-coded by category, with the count displayed inline. The bars animate to their width on mount using CSS transitions.

### 2. AnalogGauge
An SVG circular gauge with a rotating needle — like a voltmeter on a lab bench. The needle rotates from a min-angle to a max-angle based on a normalized value (0–100). Used for displaying system load, stability %, and signal confidence.

### 3. SignalTrace
A miniature sparkline rendered with SVG `<polyline>` or CSS gradients. Shows a time-series of recent values as a continuous trace — like an oscilloscope readout. Compact enough to fit inside a dashboard card.

### 4. DistributionMatrix
A grid of colored cells where intensity maps to file size. Rows are directories, columns are file types, color depth indicates byte volume. A data-dense display that reveals project structure at a glance.

---

## Success Criteria
- [ ] You can explain when and why to use `useMemo`
- [ ] You can explain when and why to use `useCallback`
- [ ] You can read and understand the existing `telemetryModel` computation
- [ ] You've built a CSS-only bar chart that renders from data
- [ ] You've built an SVG gauge with dynamic needle rotation
- [ ] You've created a new `/spectrum` route with a data visualization dashboard
- [ ] All visualizations consume real backend data through the service layer
- [ ] Derived transforms are properly memoized

---

## Lab Notebook Entry
> *"Raw photons are invisible to the naked eye. A spectrometer refracts them into a visible spectrum. Your data is those photons — useMemo is the prism, your visualization components are the detector array. Transform the invisible into the observable."*
