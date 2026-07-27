# PHASE 09 — HEX AUTHENTICATOR
## Complex Forms and Sequence Validation

> **STATUS:** PENDING_AUTHORIZATION  
> **DOMAIN:** Form state, array validation, and conditional UI  
> **ESTIMATED STEPS:** 6  
> **PREREQUISITE:** Completion of Phase 08

---

## Mission Brief
We must secure the system. Instead of a boring password input, we will build a lock screen consisting of a grid of hexagons. The user must click a specific pattern to authenticate and reveal the workspace.

---

## What You Will Learn

| Step | Topic | React Concept |
|------|-------|---------------|
| 1 | Build the Hex Grid UI | CSS layouts |
| 2 | Accumulate click history in state | Arrays in `useState` |
| 3 | Define the master sequence | Hardcoded validation |
| 4 | Evaluate the sequence on each click | Logic checks |
| 5 | Implement visual reset on failure | State clearing |
| 6 | Conditionally render the Workspace | Protected routes/views |

---

## Key Files You Will Touch

| File | Action |
|------|--------|
| `src/components/features/HexAuthenticator.jsx` | **CREATE** — The lock screen component |
| `src/app/AppLayout.jsx` | **MODIFY** — The conditional wrapper |

---

## Concepts Deep Dive

### Array State Accumulation
When tracking a sequence (like clicking button 4, then 1, then 6), we cannot simply replace state. We must take the existing array and append the new value to it. This requires careful use of the spread operator (`...`) to avoid mutating React state directly.

### Conditional Rendering at Scale
We've rendered small elements conditionally before. Here, we will conditionally render the *entire application*. If `isAuthenticated` is false, the Hex Authenticator takes over the whole screen. If true, the main `Router` outlet is revealed.

---

## Success Criteria
- [ ] The application is hidden behind the hex grid
- [ ] Clicking the correct sequence unlocks the app
- [ ] Incorrect sequences reset the grid with a visual flash

---

## Lab Notebook Entry
> *"Security interfaces don't have to be boring. A tactile, physical-feeling lock mechanism reinforces the premium nature of the application."*
