# PHASE 04 — PRECISION FADER
## Advanced DOM Interaction and Mathematical Constraints

> **STATUS:** PENDING_AUTHORIZATION  
> **DOMAIN:** React Refs and custom event handling  
> **ESTIMATED STEPS:** 7  
> **PREREQUISITE:** Completion of Phase 03

---

## Mission Brief
Standard HTML range inputs are insufficient for our premium interface. We will build a custom, professional-grade slider resembling a fader on a studio mixing board. This component requires precise tracking of the user's mouse.

---

## What You Will Learn

| Step | Topic | React Concept |
|------|-------|---------------|
| 1 | Build the fader track and thumb DOM | UI structure and CSS positioning |
| 2 | Attach `useRef` to the track | DOM measurement in React |
| 3 | Implement `onMouseDown` to start drag | Event initiation |
| 4 | Attach global `mousemove` listeners | Tracking state outside the component |
| 5 | Calculate mouse Y position to % | UI Mathematics |
| 6 | Constrain the value between 0-100 | Boundary logic |
| 7 | Clean up event listeners on drag end | Memory management |

---

## Key Files You Will Touch

| File | Action |
|------|--------|
| `src/components/features/PrecisionFader.jsx` | **CREATE** — The custom slider component |

---

## Concepts Deep Dive

### Bypassing Synthetic Events
Usually, we use `onClick` or `onChange` provided by React. But to build a dragging slider, we need to track mouse movement even if the cursor slips outside the physical thumb element. To do this, we attach native event listeners directly to the `window` object when the drag starts, and remove them when the drag ends.

### The useRef Hook
React normally abstracts the DOM away from us. However, to calculate math for a custom slider, we need to know exactly how many pixels tall our track is. The `useRef` hook allows us to grab a direct reference to the actual HTML node so we can read its `getBoundingClientRect()`.

---

## Success Criteria
- [ ] You can attach and remove native window event listeners cleanly
- [ ] You can read element dimensions using `useRef`
- [ ] You can calculate constrained percentage values from raw mouse coordinates
- [ ] The operator can click and drag the fader thumb smoothly

---

## Lab Notebook Entry
> *"Building custom interactive components from scratch teaches you exactly how the browser handles events. It is a rite of passage for UI engineers."*
