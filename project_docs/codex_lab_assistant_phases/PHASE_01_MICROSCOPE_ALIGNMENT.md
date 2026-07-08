# PHASE 01 //: MICROSCOPE_ALIGNMENT
## Repo Orientation, Component Anatomy, And The First Teaching Surface

> STATUS: PENDING_AUTHORIZATION  
> DOMAIN: React foundations and project literacy  
> ESTIMATED STEPS: 6 to 8  
> PREREQUISITE: Read `GEMINI.md`, `AGENT_PROTOCOL.md`, `FRONTEND_BACKEND.md`, and `THEME.md`

## Mission Brief

Before a laboratory instrument is calibrated, the researcher aligns the microscope. This phase aligns the operator with the actual codebase. The goal is not to build random starter components. The goal is to study the existing shell, identify the real component boundaries, and create a small orientation surface inside the app that explains the laboratory system through the app itself.

The first deliverable should be a compact `LabBriefingPanel` or equivalent dashboard module. It should teach the operator how `AppLayout`, `router.jsx`, `DashboardPage`, `PageHeader`, and feature components fit together. This makes the app self-teaching from the first phase.

## Learning Focus

The operator learns what a React component returns, why props are read-only inputs, how JSX describes UI, and how the project already separates pages from reusable feature components. The assistant should use real files from this repo as the teaching material instead of abstract examples.

The Python portion is intentionally light in this phase. The assistant should briefly show that the frontend already receives backend information from `/api/stats`, then save the deeper FastAPI work for later phases.

## Step Map

| Step | Laboratory Task | Concept |
| --- | --- | --- |
| 1 | Trace the render path from `main.jsx` to `DashboardPage` | React app entry, router, layout, outlet |
| 2 | Dissect `PageHeader` and one feature card | functional components, props, composition |
| 3 | Design a `LabBriefingPanel` data shape | arrays, object literals, rendering data |
| 4 | Render the briefing rows with `.map()` | list rendering and stable keys |
| 5 | Add status variants using props | conditional class names and state labels |
| 6 | Mount the panel in the dashboard placeholder area | imports, layout placement, visual consistency |
| 7 | Review the result against theme rules | token usage, density, mechanical UI tone |
| 8 | Write a short lab notebook summary | documentation mindset and recall |

## Target Files

| File | Intent |
| --- | --- |
| `src/components/features/LabBriefingPanel.jsx` | New orientation panel that teaches project structure |
| `src/pages/DashboardPage.jsx` | Mount the panel where the current placeholder block lives |
| `src/index.css` or component CSS | High-fidelity lab styling if shared classes are insufficient |

## Assistant Teaching Contract

The assistant should start with Step 1 only. It should explain the render path in two concise paragraphs, then give a small reading task or a small component skeleton. It should not provide Step 2 until the operator confirms.

The first checkpoint should ask the operator to point out where the page content appears inside `AppLayout`. This makes the operator actively read the React tree instead of passively receiving code.

## Success Criteria

The phase is complete when the operator can describe how a route becomes visible on screen, explain why props are passed into a component, and identify where a new dashboard module belongs. The app should contain a polished orientation panel that feels like a laboratory briefing card rather than a generic tutorial widget.

## Lab Note

Microscope alignment is not glamorous, but it prevents every later observation from being distorted. In code, orientation is the same discipline: know the render path before changing the instrument.

