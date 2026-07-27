# PHASE 06 — ROUTING PATCH BAY
## Complex State Graphs and Reducers

> **STATUS:** PENDING_AUTHORIZATION  
> **DOMAIN:** React `useReducer` and graph state  
> **ESTIMATED STEPS:** 8  
> **PREREQUISITE:** Completion of Phase 05

---

## Mission Brief
We are building a "Patch-Bay"—a matrix where users connect virtual inputs to virtual outputs. This requires complex state management beyond simple true/false flags. We must track which node is connected to which, ensuring valid routing paths.

---

## What You Will Learn

| Step | Topic | React Concept |
|------|-------|---------------|
| 1 | Design the connection state shape | Graph data modeling |
| 2 | Write the patch-bay reducer function | Pure functions and state transitions |
| 3 | Build the Input/Output node UI | Component layout |
| 4 | Dispatch click actions to the reducer | React `useReducer` |
| 5 | Handle "connection in progress" state | Intermediate UI states |
| 6 | Validate connections (no dupes) | Business logic in reducers |
| 7 | Draw visual lines between nodes | Advanced CSS/SVG (simplified) |

---

## Key Files You Will Touch

| File | Action |
|------|--------|
| `src/components/features/PatchBay.jsx` | **CREATE** — The main matrix component |
| `src/components/features/PatchNode.jsx` | **CREATE** — Individual connectable jacks |

---

## Concepts Deep Dive

### Escaping State Spaghetti
When state becomes a web of dependencies (e.g., "If I click input A, and output B is already connected to C, disconnect C and connect to A"), using multiple `useState` hooks leads to buggy, unpredictable code. 

### The useReducer Hook
`useReducer` is the solution for complex state. Instead of directly setting state, you dispatch an "action" (like `{ type: 'MAKE_CONNECTION', payload: { from: 1, to: 2 } }`). A central, pure function (the reducer) looks at the current state and the action, and calculates the new state exactly according to your strict rules.

---

## Success Criteria
- [ ] You can define a complex state reducer
- [ ] You can dispatch actions to update state
- [ ] The operator can click an input node, then an output node, and the state successfully records and displays a valid connection.

---

## Lab Notebook Entry
> *"When state becomes a web of dependencies, `useState` leads to spaghetti code. `useReducer` restores order by centralizing the rules of change."*
