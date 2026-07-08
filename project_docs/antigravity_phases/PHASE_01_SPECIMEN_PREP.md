# PHASE 01 — SPECIMEN_PREP
## Component Anatomy, Props, and JSX Rendering

> **STATUS:** PENDING_AUTHORIZATION
> **DOMAIN:** React Foundations
> **ESTIMATED STEPS:** 6–8
> **PREREQUISITE:** None — this is the entry point.

---

## Mission Brief

Before any experiment can run, every specimen must be prepared — labeled, mounted, and made observable. In React terms, this means understanding what a **component** actually *is*: a self-contained unit of UI that accepts inputs (props), returns JSX, and composes with other components to form larger interfaces.

This phase strips the LAB_TERMINAL dashboard down to its atoms. You will dissect existing components like `PageHeader`, `DetailRow`, and `WeatherData` to understand how data flows from parent to child. Then you will build entirely new laboratory-grade UI primitives from scratch — things like a `StatusBadge`, a `MetricReadout`, and a `SpecimenCard` — all following the project's skeuomorphic theme.

---

## What You Will Learn

| Step | Topic | React Concept |
|------|-------|---------------|
| 1 | Anatomy of a functional component | Function → JSX return, export patterns |
| 2 | Reading and rendering props | Destructuring, default values, prop types |
| 3 | Conditional rendering | Ternaries, `&&` short-circuit, early returns |
| 4 | Rendering lists with `.map()` | Keys, array iteration, dynamic UI from data |
| 5 | Component composition | Children prop, slot patterns, nesting |
| 6 | Building a reusable `StatusBadge` component | Putting it all together in a lab-themed widget |
| 7 | Building a `MetricReadout` display | Styled numeric readouts with units and labels |
| 8 | Mounting new components on the Dashboard | Import chains, layout grid placement |

---

## Key Files You Will Touch

| File | Action |
|------|--------|
| `src/components/features/StatusBadge.jsx` | **CREATE** — Reusable status indicator |
| `src/components/features/MetricReadout.jsx` | **CREATE** — Numeric lab readout display |
| `src/components/features/SpecimenCard.jsx` | **CREATE** — Composable card primitive |
| `src/pages/DashboardPage.jsx` | **MODIFY** — Mount new components |
| `src/index.css` | **MODIFY** — AI writes new theme classes |

---

## Concepts Deep Dive

### What is a Component?
A React component is a JavaScript function that returns JSX — a syntax that looks like HTML but compiles to `React.createElement()` calls. Every visible piece of your LAB_TERMINAL is a component: `MenuBar`, `PageHeader`, `WeatherData`, `TelemetryCalibrationConsole`. Components are the molecules of your interface. They receive data through **props** (read-only inputs), and they return a **description** of what the UI should look like — React handles the actual DOM work.

### Why Props, Not Global Variables?
In a laboratory, you don't dump all your reagents into one beaker and hope for the best. You label each vial, pass precise quantities to the next station, and track inputs at every step. Props work the same way: `<StatusBadge status="ONLINE" label="BUS" />` is an explicit, traceable data transfer. The component doesn't reach outside itself to grab data — it receives exactly what it needs. This pattern is called **unidirectional data flow**, and it's the backbone of React's predictability. When something breaks, you trace the prop chain, not a tangle of global state.

---

## Example Teaching Format (What Steps Will Look Like)

```
### Step 1 — Dissecting a Functional Component
* **Key Concept:** [Two paragraphs explaining the React topic]
* **Code Implementation:** [Complete, paste-ready JSX skeleton]
* **CHECKPOINT:** "Does your component render correctly? Type PROCEED for Step 2."
```

---

## Success Criteria
- [ ] You can explain what a functional component returns and why
- [ ] You can pass props to a child component and render them dynamically
- [ ] You can conditionally render UI based on prop values
- [ ] You can map over an array and render a list with unique keys
- [ ] You have built and mounted at least 2 new lab-themed components
- [ ] All new components use the project's CSS token system (`--color-accent-primary`, `.section-label`, etc.)

---

## Lab Notebook Entry
> *"The first rule of the laboratory: know your specimens before you experiment on them. A component is a specimen. Props are its label. JSX is its observable form under the microscope."*
