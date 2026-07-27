# Frontend Architecture (src/ARCHITECTURE.md)

## System Overview
The frontend is a laboratory control terminal application built with **React 19** and **Vite**.

## Directory Structure
```text
src/
├── app/
│   ├── AppLayout.jsx    # Primary Shell layout (header, sidebar, content area)
│   └── router.jsx       # React Router 6/7 createBrowserRouter definition
├── components/
│   ├── features/        # Business logic & hardware feature components
│   └── menu/            # Navigation bar & menu components
├── pages/               # Top-level page views mounted in router
├── hooks/               # Custom React hooks (e.g. useFetchFlask)
├── index.css            # Global Theme Tokens & LAB_TERMINAL hardware styles
├── main.jsx             # React DOM entry point
└── ARCHITECTURE.md      # This file
```

## Structural Decisions & Constraints
- **Routing:** All page routes must be registered in `src/app/router.jsx` and navigated via `MenuBar.jsx`.
- **Component Pattern:** Components must be functional. State logic is encapsulated in custom hooks or local `useState`.
- **API Integration:** Frontend calls backend API endpoints on `http://127.0.0.1:8000/api/...`.
- **CSS Delegation:** Global design tokens and hardware skeuomorphic styles are defined in `src/index.css` and documented in `src/THEME.md`.

## Verification Commands
- **Linting:** `npm run lint`
- **Build:** `npm run build`
