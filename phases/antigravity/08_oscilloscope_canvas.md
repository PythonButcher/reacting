# PHASE 08 — OSCILLOSCOPE CANVAS
## High-Performance Rendering and Animation Loops

> **STATUS:** PENDING_AUTHORIZATION  
> **DOMAIN:** HTML5 Canvas and React integration  
> **ESTIMATED STEPS:** 7  
> **PREREQUISITE:** Completion of Phase 07

---

## Mission Brief
For absolute visual impact, we will integrate an HTML5 canvas to draw a glowing, real-time waveform. This teaches how to step outside of the React render cycle for high-frequency visual updates.

---

## What You Will Learn

| Step | Topic | React Concept |
|------|-------|---------------|
| 1 | Mount the `<canvas>` element | Canvas setup |
| 2 | Secure the canvas `useRef` | Native DOM access |
| 3 | Initialize the drawing context (2D) | Canvas API basics |
| 4 | Write the `requestAnimationFrame` loop | Animation fundamentals |
| 5 | Generate waveform math (sine/noise) | Procedural generation |
| 6 | Draw and stroke the path | Canvas rendering |
| 7 | Implement cleanup to stop the loop | Preventing memory leaks |

---

## Key Files You Will Touch

| File | Action |
|------|--------|
| `src/components/features/Oscilloscope.jsx` | **CREATE** — The canvas component |

---

## Concepts Deep Dive

### Stepping Outside React
React is built to update the DOM efficiently when data changes. But updating the DOM 60 times a second for an animation is far too heavy. An HTML5 `<canvas>` allows us to draw directly to a pixel buffer using vanilla JavaScript. We use React to *mount* the canvas, but we use `requestAnimationFrame` to draw on it independently.

### The Cleanup Function
When a component unmounts (e.g., you navigate to another page), any running intervals or animation loops must be stopped, otherwise they will continue running in the background, chewing up CPU and causing errors. The return function inside `useEffect` is where we cancel the animation frame.

---

## Success Criteria
- [ ] A smooth, glowing, continuously updating waveform is rendered on the screen at 60fps
- [ ] Navigating away from the page correctly halts the animation loop without errors

---

## Lab Notebook Entry
> *"React is incredible for UI state, but terrible for 60fps graphics. Knowing when to drop down to the raw Canvas API is a crucial performance skill."*
