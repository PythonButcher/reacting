# PHASE 01 — THE TACTILE ARRAY
## Mechanical Switch Construction and React Foundations

> **STATUS:** PENDING_AUTHORIZATION
> **DOMAIN:** React Foundations
> **ESTIMATED STEPS:** 6–8
> **PREREQUISITE:** None — this is the entry point.

---

## Mission Brief

The first step in building a premium control terminal is feeling the controls. We are going to build a satisfying, mechanical-feeling push-button array. Instead of generic web buttons, these will utilize advanced CSS transforms to simulate physical depth and a glowing active state. 

This phase grounds the operator in fundamental React concepts by translating physical hardware metaphors into component architecture. We will build a single robust button, then render a bank of them dynamically.

---

## What You Will Learn

| Step | Topic | React Concept |
|------|-------|---------------|
| 1 | Anatomy of a functional component | Function → JSX return, export patterns |
| 2 | Applying mechanical CSS transforms | CSS skeuomorphism, `active` states |
| 3 | Implementing local toggle state | `useState` hook and click handlers |
| 4 | Accepting dynamic labels and colors | React `props` |
| 5 | Designing the `SwitchBank` data array | Data structures and component rendering |
| 6 | Mapping the array into the dashboard | List rendering and `key` props |

---

## Key Files You Will Touch

| File | Action |
|------|--------|
| `src/components/features/TactileSwitch.jsx` | **CREATE** — The core mechanical button component |
| `src/components/features/SwitchBank.jsx` | **CREATE** — The container component |
| `src/pages/DashboardPage.jsx` | **MODIFY** — Mount the SwitchBank for testing |
| `src/index.css` | **MODIFY** — AI writes new mechanical theme classes |

---

## Concepts Deep Dive

### What is a Component?
A React component is a JavaScript function that returns JSX — a syntax that looks like HTML but compiles to `React.createElement()` calls. Every visible piece of your LAB_TERMINAL is a component. Components are the molecules of your interface. They receive data through **props** (read-only inputs), and they return a **description** of what the UI should look like — React handles the actual DOM work.

### Why Props, Not Global Variables?
In hardware engineering, you don't run every wire to a central battery; you route power specific to the module. Props work the same way: `<TactileSwitch status="ACTIVE" label="OVERRIDE" />` is an explicit, traceable data transfer. The component doesn't reach outside itself to grab data — it receives exactly what it needs. This pattern is called **unidirectional data flow**, and it's the backbone of React's predictability.

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
- [ ] You can manage local toggle state with `useState`
- [ ] You can map over an array and render a list of buttons with unique keys
- [ ] The button exhibits a distinct visual "clunk" via CSS transforms when clicked
- [ ] All new components use the project's CSS token system (`--color-accent-primary`, etc.)

---

## Lab Notebook Entry
> *"A tactile interface builds trust. When an operator feels the physical response of a digital component, the entire application feels more premium and reliable."*
