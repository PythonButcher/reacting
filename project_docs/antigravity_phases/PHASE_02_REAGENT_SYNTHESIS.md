# PHASE 02 — REAGENT_SYNTHESIS
## State Hooks, Side Effects, and Lifting State

> **STATUS:** PENDING_AUTHORIZATION
> **DOMAIN:** React State Management
> **ESTIMATED STEPS:** 7–9
> **PREREQUISITE:** Phase 01 — SPECIMEN_PREP

---

## Mission Brief

A reagent sitting in a bottle does nothing. It's inert. But the moment you introduce it to a reaction — the moment it *changes* — that's when the experiment begins. React state is your reagent. It's the data that, when it changes, causes your component to re-render and reflect a new reality on screen.

In this phase, you'll move beyond static props and learn how to make your LAB_TERMINAL components **reactive**. You'll build an interactive `ReactionChamber` component — a self-contained widget where the user can adjust input parameters and watch derived outputs update in real time. You'll also learn how `useEffect` lets you synchronize your component with the outside world (timers, APIs, the browser), and how **lifting state** lets sibling components share data through a common ancestor.

---

## What You Will Learn

| Step | Topic | React Concept |
|------|-------|---------------|
| 1 | Declaring and updating state | `useState` hook, setter functions, immutable updates |
| 2 | State as the source of truth | Why state drives re-renders, mental model of the render cycle |
| 3 | Controlled inputs | Binding form inputs to state, `onChange` handlers |
| 4 | Building a `ReactionChamber` widget | Interactive sliders/inputs that update derived values |
| 5 | Side effects with `useEffect` | Running code after render, dependency arrays, cleanup |
| 6 | Building a `LabTimer` component | `useEffect` with `setInterval`, cleanup on unmount |
| 7 | Lifting state up | Shared state between siblings via parent, callback props |
| 8 | Refactoring Dashboard panels to share state | Practical application on existing DashboardPage |
| 9 | Updating objects and arrays in state | Spread operator, immutable patterns, why mutation breaks React |

---

## Key Files You Will Touch

| File | Action |
|------|--------|
| `src/components/features/ReactionChamber.jsx` | **CREATE** — Interactive state playground |
| `src/components/features/LabTimer.jsx` | **CREATE** — Ticking timer with useEffect |
| `src/components/features/ReagentMixer.jsx` | **CREATE** — Multi-input state + derived output |
| `src/pages/DashboardPage.jsx` | **MODIFY** — Integrate new stateful components |
| `src/index.css` | **MODIFY** — AI writes reaction chamber styles |

---

## Concepts Deep Dive

### useState: The Reactive Reagent
When you call `const [temperature, setTemperature] = useState(22)`, you're creating a slot in React's memory for this component. The `temperature` variable is the current value. The `setTemperature` function is how you request a change. When you call `setTemperature(37)`, React doesn't instantly mutate the variable — it schedules a re-render. On the next render, `temperature` returns `37`, and your JSX reflects the new state. This is fundamentally different from `let temp = 22; temp = 37;` — regular variable assignment doesn't trigger re-renders. State is the chemical ignition switch.

### useEffect: The Laboratory Timer
Some things in a laboratory run on a clock — incubation timers, sampling intervals, equipment warm-up sequences. `useEffect` is how you tell React: "After you've finished painting the screen, run this side effect." The dependency array (`[deps]`) controls *when* the effect re-runs. An empty array `[]` means "run once after mount." A specific dependency like `[temperature]` means "re-run whenever temperature changes." And the cleanup function (the `return` inside `useEffect`) is how you shut down timers or cancel subscriptions when the component unmounts — like turning off the incubator when the experiment is complete.

---

## Architecture Connection

This phase directly connects to two existing patterns in the codebase:
- **`ResearchJournalPage.jsx`** already uses `useState` for `archives` and `isLoading`, and `useEffect` for initial data fetch. You'll study this pattern and then build your own.
- **`TelemetryCalibrationConsole.jsx`** uses 12+ state hooks and complex derived values via `useMemo`. This phase prepares you to understand that 657-line component — by the end, you'll know exactly why each `useState` exists and how the `telemetryModel` computation works.

---

## Success Criteria
- [ ] You can declare state with `useState` and update it through user interactions
- [ ] You understand why calling the setter triggers a re-render
- [ ] You can build controlled form inputs (text, range sliders, selects)
- [ ] You can use `useEffect` with correct dependency arrays
- [ ] You can set up and properly clean up a timer with `useEffect`
- [ ] You can lift state from a child component into a parent
- [ ] You understand immutable state updates for objects and arrays

---

## Lab Notebook Entry
> *"A reaction without a reagent is just a beaker full of nothing. State is the reagent — the thing that changes, the thing that makes the interface alive. Without it, your components are just painted glass."*
