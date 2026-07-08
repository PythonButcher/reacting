# PHASE 04 — CONTAINMENT_FIELD
## Context API, Global State, and Provider Architecture

> **STATUS:** PENDING_AUTHORIZATION
> **DOMAIN:** React Context & State Architecture
> **ESTIMATED STEPS:** 7–8
> **PREREQUISITE:** Phase 03 — CENTRIFUGE_PROTOCOL

---

## Mission Brief

A containment field in a laboratory isn't just a barrier — it's a controlled environment that makes specific resources available to everything inside it, while keeping everything outside unaffected. React Context works the same way. It creates a boundary within your component tree where specific data becomes available to any descendant, without manually threading props through every intermediate layer.

Right now, the LAB_TERMINAL has a subtle but growing problem: **prop drilling**. `AppLayout` passes `showSideBar` and `setShowSideBar` down to `SideBar`. `ActiveTestsPage` manages all test module state locally. If you wanted the sidebar to display the count of active tests, or if you wanted a global notification system, you'd have to thread props through `AppLayout → Outlet → Page → Component` — an increasingly tangled wiring harness. Context solves this by creating an electromagnetic containment field that any component inside the boundary can tap into directly.

---

## What You Will Learn

| Step | Topic | React Concept |
|------|-------|---------------|
| 1 | The prop drilling problem | Visualizing data flow through component trees |
| 2 | `createContext` and the Provider pattern | Creating a context, wrapping a subtree with a Provider |
| 3 | `useContext` — consuming context values | Reading shared state from anywhere in the tree |
| 4 | Building `LabSystemContext` — a system-wide state provider | Online/offline status, theme mode, operator identity |
| 5 | Building `NotificationContext` — a global alert system | Toasts, warnings, system messages across all pages |
| 6 | Creating a `NotificationToast` UI component | Lab-themed alert banner with auto-dismiss |
| 7 | Refactoring the sidebar state into context | Moving `showSideBar` from AppLayout props into context |
| 8 | Context vs. prop drilling — when to use which | Performance considerations, over-contextualization traps |

---

## Key Files You Will Touch

| File | Action |
|------|--------|
| `src/context/LabSystemContext.jsx` | **CREATE** — Global system state provider |
| `src/context/NotificationContext.jsx` | **CREATE** — Alert/toast notification system |
| `src/components/features/NotificationToast.jsx` | **CREATE** — Visual toast component |
| `src/app/AppLayout.jsx` | **MODIFY** — Wrap app in providers, refactor sidebar |
| `src/app/App.jsx` | **MODIFY** — Provider tree composition |
| `src/pages/DashboardPage.jsx` | **MODIFY** — Consume system context |
| `src/index.css` | **MODIFY** — AI writes toast/notification styles |

---

## Concepts Deep Dive

### Context as a Containment Field
Imagine your lab has a gas line that runs behind every bench — any station can connect to it without routing a dedicated pipe from the supply room. That's Context. You define a `LabSystemProvider` at the top of your app, and any component anywhere in the tree can call `useContext(LabSystemContext)` to access shared state. The Provider holds the state (`useState`), the context distributes it, and consumers read it. No prop threading required. This pattern is especially powerful for cross-cutting concerns like authentication, theme settings, notification systems, and system-wide status flags.

### The Provider Pattern: Nesting Containment Fields
In a real facility, containment fields can be nested — a cleanroom inside a laboratory inside a building. Context providers nest the same way. Your app might have `<LabSystemProvider>` wrapping `<NotificationProvider>` wrapping `<Router>`. Each provider manages its own slice of global state. The key insight is that Context is NOT a replacement for all props — it's specifically for data that many components at different tree depths need to access. Using Context for everything is like putting a containment field around a single test tube — overkill. Local state (props, `useState`) is still the right tool for component-specific data.

---

## Architecture Connection

This phase introduces the project's first real global state architecture:
- **`src/context/ContextMenu.jsx`** already exists as a pattern reference — but it's a UI component, not a true context provider. You'll learn the difference.
- **`AppLayout.jsx`** currently manages sidebar state with `useState` + prop drilling. This phase migrates that to context, setting a clean precedent.
- The `NotificationContext` you build here becomes the backbone for error reporting in later phases — when a journal save fails or a telemetry calibration errors out, the notification system fires lab-themed toasts.

---

## The Notification System (Unique Feature)

This phase builds something the app doesn't have yet: a **global notification system** with a laboratory aesthetic. Think:
- 🟠 **WARNING** — amber-glowing toast: `"JOURNAL_COMMIT_FAILED // RETRY_SUGGESTED"`
- 🟢 **CONFIRMED** — green-pulse toast: `"SPECIMEN_LOGGED // VAULT_UPDATED"`
- 🔴 **FAULT** — red-flash toast: `"API_UNREACHABLE // BACKEND_COLD"`

These toasts appear overlaid in a corner of the terminal, auto-dismiss after a configurable duration, and use the existing Safety Orange / Isotope Green / fault-red palette.

---

## Success Criteria
- [ ] You can explain why prop drilling becomes a problem at scale
- [ ] You can create a Context with `createContext` and provide values via a Provider
- [ ] You can consume context values with `useContext` in any descendant
- [ ] You've built a `LabSystemContext` with system-wide state (status, operator, etc.)
- [ ] You've built a `NotificationContext` with `addNotification` and auto-dismiss
- [ ] The sidebar state has been migrated from prop drilling to context
- [ ] You understand when Context is appropriate vs. when props are sufficient

---

## Lab Notebook Entry
> *"A containment field doesn't carry the specimen to each workstation. It makes the specimen accessible to every workstation simultaneously. Context is the containment field — one source, universal access, no hand-delivery required."*
