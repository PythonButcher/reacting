# PHASE 07 — MULTIPANE WORKSPACE
## Application Architecture and Client-Side Routing

> **STATUS:** PENDING_AUTHORIZATION  
> **DOMAIN:** React Router and Layout Composition  
> **ESTIMATED STEPS:** 5  
> **PREREQUISITE:** Completion of Phase 06

---

## Mission Brief
Our application is getting crowded. We need a professional way to navigate between these massive hardware components without losing state or reloading the page. We will implement a robust workspace routing system.

---

## What You Will Learn

| Step | Topic | React Concept |
|------|-------|---------------|
| 1 | Restructure `router.jsx` | Route definition |
| 2 | Create `TelemetryView` and `ControlView` | Page-level components |
| 3 | Migrate existing components to views | Component composition |
| 4 | Build the `WorkspaceNav` tab switcher | `Link` and `NavLink` usage |
| 5 | Verify layout persistence | Understanding the `<Outlet />` |

---

## Key Files You Will Touch

| File | Action |
|------|--------|
| `src/app/router.jsx` | **MODIFY** — Routing configuration |
| `src/components/menu/WorkspaceNav.jsx` | **CREATE** — The navigation bar |
| `src/pages/*` | **CREATE** — The new view pages |

---

## Concepts Deep Dive

### React Router
React Router intercepts URL changes in the browser before they hit the server. It then swaps out which component is currently rendered on the screen. This makes navigating feel instant, like a native desktop application, instead of a traditional website that flickers white on every click.

### The Layout Outlet
When you define a layout route, you create a shell (like a constant header or sidebar) and an `<Outlet />`. The Outlet is a placeholder where the specific page content is injected. This ensures your shell never re-renders when navigating between views.

---

## Success Criteria
- [ ] The application has multiple distinct tabs
- [ ] Clicking tabs swaps the main content area instantly without a full page refresh
- [ ] The Layout shell persists during navigation

---

## Lab Notebook Entry
> *"A good application layout is like a well-organized workbench. Everything has its place, and switching tools is effortless."*
