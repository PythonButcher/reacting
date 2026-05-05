# Frontend Architecture

The frontend is a React 19 and Vite application using functional components, React Router, Tailwind CSS v4, and a LAB_TERMINAL visual system defined in `src/index.css`.

## Application Entry

`src/main.jsx` mounts the React application. Routing is centralized in `src/app/router.jsx`, which keeps page registration separate from layout code.

`src/app/AppLayout.jsx` owns the persistent shell. It renders the top menu, slide-out sidebar, and the `Outlet` where each route renders its page.

## Routing

The current app uses `createBrowserRouter` from React Router. Page components live under `src/pages`, while reusable UI and feature components live under `src/components`.

When adding a new page, create the page component first, then register it in `src/app/router.jsx`, then expose navigation from `src/components/menu/MenuBar.jsx` if it should be user-facing.

## Theme System

Theme tokens live in `src/index.css`. The key tokens are Safety Orange through `--color-accent-primary`, Isotope Green through `--color-accent-secondary`, `--color-bg-main`, `--color-bg-panel`, `--color-bg-hover`, `--color-text-main`, `--color-text-dim`, `--color-accent-glow`, and `--color-border`.

Prefer the shared classes `.journal-panel`, `.journal-button`, `.journal-select`, and `.section-label` before creating isolated styling. New UI should feel like laboratory hardware: precise labels, compact panels, restrained glow, mono typography, dark mechanical surfaces, and tactile controls.

## Current Component Pattern

Feature components are currently simple functional components with local state or small fetch hooks. `useFetchFlask` is the reusable backend-fetch hook for simple GET requests. More complex workflows, such as journal writes and deletes, currently keep their request logic close to the page or feature component.

As the app grows, API calls should move toward a small service layer so endpoint URLs, response parsing, and error normalization are not repeated throughout the component tree.

## Known Frontend Notes

`src/app/App.css` still contains default Vite starter styles. Before larger layout work, review whether those global root constraints are still intended because they can affect full-width terminal layouts.

`DashboardPage.jsx` imports `@eslint/js` but does not use it. That should be removed during a cleanup pass because the lint config treats unused variables as errors unless they match the configured ignore pattern.

Several backend URLs are hard-coded to `http://127.0.0.1:8000`. That is acceptable during local development, but a Vite environment variable such as `VITE_API_BASE_URL` would be better when the project needs portable deployment behavior.
