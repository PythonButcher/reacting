# PHASE 05 //: SPECTROMETER_WALL
## Derived Data, Memoization, And Scientific Visualization Components

> STATUS: PENDING_AUTHORIZATION  
> DOMAIN: React data transformation and visualization  
> ESTIMATED STEPS: 8 to 10  
> PREREQUISITE: Phase 04

## Mission Brief

LAB_TERMINAL already has useful data: project statistics, inventory registry entries, weather readings, journal counts, experiment modules, and telemetry control values. Much of it is still displayed as plain text. This phase turns the dashboard into a spectrometer wall: a collection of compact, readable instruments that reveal patterns.

The deliverable is a set of reusable visualization components that do not require a charting library. The operator learns how raw JSON becomes derived display data, then how derived display data becomes UI.

## Learning Focus

The operator learns `useMemo`, pure transformation functions, normalization, SVG basics, CSS variables, and when memoization actually matters. The assistant should connect this directly to `TelemetryCalibrationConsole.jsx`, which already uses `useMemo` to derive `telemetryModel`.

The Python portion can add small backend improvements to make visualization easier, such as returning normalized file type summaries or experiment counts. It should remain simple and explainable.

## Step Map

| Step | Laboratory Task | Concept |
| --- | --- | --- |
| 1 | Study `telemetryModel` as an existing derived data example | memoized calculations |
| 2 | Normalize file type distribution from `/api/stats` | data shaping |
| 3 | Build a `SpectralBar` primitive | visual components from props |
| 4 | Build a project composition spectrograph | mapping data to bars |
| 5 | Build a compact gauge for health or confidence | SVG geometry and normalized values |
| 6 | Build an inventory composition panel | aggregating registered assets |
| 7 | Add journal or experiment trend readouts | derived counts and simple time grouping |
| 8 | Mount instruments on Dashboard or a dedicated route | composition and responsive layout |
| 9 | Profile unnecessary recomputation | when `useMemo` helps and when it is noise |
| 10 | Visual QA against theme rules | density, contrast, lab instrument feel |

## Target Files

| File | Intent |
| --- | --- |
| `src/components/features/SpectralBar.jsx` | Reusable bar readout primitive |
| `src/components/features/ProjectSpectrometer.jsx` | File type distribution instrument |
| `src/components/features/LabGauge.jsx` | Reusable SVG gauge |
| `src/components/features/InventoryCompositionPanel.jsx` | Inventory visualization |
| `src/pages/DashboardPage.jsx` | Mount selected instruments |
| `backend/backend_core/project_stats.py` | Optional small summary improvements |

## Assistant Teaching Contract

The assistant should not start with SVG complexity. It should begin with the data transform and ask the operator to inspect the transformed array before rendering. Only after the data shape is clear should it introduce visual components.

The assistant should explain that `useMemo` is not a decoration. It is useful when a calculation is expensive, repeated, or creates references that affect child rendering.

## Success Criteria

The phase is complete when at least two real backend data sources are represented as reusable lab instruments, the operator can explain derived data, and the dashboard feels more like a scientific workstation than a list of API responses.

## Lab Note

A spectrometer does not create the signal. It reveals the structure already hidden inside it. React visualization follows the same rule.

