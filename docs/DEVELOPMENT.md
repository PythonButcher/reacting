# Development Workflow

This document captures the current local workflow for LAB_TERMINAL //: REACT.

## Prerequisites

Use a current Node.js LTS release for the Vite frontend and Python 3.10 or newer for the FastAPI backend.

## Install

Install frontend dependencies with `npm install`.

Install backend dependencies with `python -m pip install -r backend/requirements.txt`.

## Run

Start the frontend with `npm run dev`. Vite normally serves the app from `http://localhost:5173`.

Start the backend with `python backend/main.py`. The API serves from `http://127.0.0.1:8000`.

Run both processes during normal development because Dashboard, Weather, Project Stats, and Research Journal features expect the backend to be available.

## Verify

Run `npm run build` before handing off frontend changes. Run `npm run lint` when changing JavaScript or JSX.

For backend-only changes, run the FastAPI server locally and manually verify the affected endpoint. Dedicated backend tests do not exist yet.

## Documentation Updates

When adding a route, update `docs/PROJECT_OVERVIEW.md` and `docs/FRONTEND.md`.

When adding or changing an endpoint, update `docs/BACKEND.md`.

When introducing a new generated file, cache, or local runtime artifact, update `.gitignore` and `docs/GITIGNORE.md`.

## Near-Term Cleanup Candidates

The current frontend would benefit from moving hard-coded API URLs into a Vite environment variable.

The default Vite CSS still present in `src/app/App.css` should be reviewed before major layout work.

The JSON journal vault is useful for local learning, but a transactional storage layer will be more robust if journal entries become important data.
