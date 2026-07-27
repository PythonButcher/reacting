# PHASE 10 — SYSTEM OVERDRIVE
## Global Context and Application Synchronization

> **STATUS:** PENDING_AUTHORIZATION  
> **DOMAIN:** React Context API and global state  
> **ESTIMATED STEPS:** 6  
> **PREREQUISITE:** Completion of Phase 09

---

## Mission Brief
For the final phase, we want a master switch that changes the behavior of the *entire* application at once—turning themes red, making the canvas erratic, and altering fader behavior. 

---

## What You Will Learn

| Step | Topic | React Concept |
|------|-------|---------------|
| 1 | Create the `OverdriveContext` | Context initialization |
| 2 | Build the `OverdriveProvider` | State injection |
| 3 | Wrap the application tree | Global availability |
| 4 | Build the Master Toggle UI | Triggering global state |
| 5 | Update Fader to consume Context | `useContext` hook |
| 6 | Update Oscilloscope to consume Context | Synchronized reactions |

---

## Key Files You Will Touch

| File | Action |
|------|--------|
| `src/app/OverdriveContext.jsx` | **CREATE** — The context definition |
| `src/main.jsx` | **MODIFY** — Wrapping the app |
| `src/components/features/MasterToggle.jsx` | **CREATE** — The trigger UI |

---

## Concepts Deep Dive

### Prop Drilling vs. Context
Normally, to pass state from a top-level component down to a deeply nested component (like the Oscilloscope), you have to pass it as a prop through every single layer in between. This is called "prop drilling" and it is tedious. The React Context API acts like a wormhole—you provide data at the top, and any component can "hook" into it directly using `useContext`.

### Global State Responsibility
Context is powerful but easily abused. It causes re-renders for every component listening to it. We use it here for a true global state (a system-wide theme/mode change) rather than localized data, which is its exact intended purpose.

---

## Success Criteria
- [ ] Flipping the Master Toggle instantly changes the visual styling and logic behavior of multiple disparate components across the application simultaneously without passing props.

---

## Lab Notebook Entry
> *"A unified system responds as one. When the master switch is thrown, every instrument falls in line."*
