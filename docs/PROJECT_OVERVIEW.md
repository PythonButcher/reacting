# Project Overview

LAB_TERMINAL //: REACT is a laboratory-themed React application backed by a local FastAPI service. The project currently behaves like a control terminal for experiments, telemetry, journal entries, and resource references.

## Current Shape

The frontend application starts at `src/main.jsx`, loads the React Router configuration from `src/app/router.jsx`, and renders the persistent shell from `src/app/AppLayout.jsx`.

The backend application starts at `backend/main.py`. It serves local API endpoints for weather, project statistics, and research journal persistence.

## Current Routes

The root route `/` renders `DashboardPage`, which provides the command-center view and consumes backend status-oriented components.

The `/experiments` route renders `ActiveTestsPage`, where users can create local test modules, ingest files into module cards, simulate analysis, and view diagnostic output.

The `/journal` route renders `ResearchJournalPage`, which connects to the backend journal API for creating, listing, and deleting research log entries.

The `/telemetry` route renders `TelemetryCalibrationPage`, which hosts the local-only Telemetry Calibration Console for future project telemetry control.

The `/resources` route renders `DocumentationPage`, which is currently an in-app documentation/resource hub.

The wildcard route renders `NotFoundPage`.

## Important Feature Areas

`BackendProjectStats` calls the FastAPI `/api/stats` endpoint and displays project-level filesystem telemetry.

`WeatherData` calls `/api/weather` and displays local weather data when the backend has WeatherAPI credentials.

`TestModuleCard` provides the core active-test interface, including module metadata, operation selection, file ingestion, progress simulation, and diagnostic output.

`JournalEntry` and `ArchiveList` provide the frontend surface for the research journal workflow.

`TelemetryCalibrationConsole` provides the future telemetry control surface. It currently keeps scan intensity, filesystem depth range, file-type focus, refresh cadence, diagnostic mode, anomaly sensitivity, log verbosity, calibration runs, guarded reset behavior, meters, and event logs in local React state only.

## Current Data Flow

The React frontend calls the FastAPI backend directly through `fetch` from localhost URLs where backend-backed features already exist. Shared data is not centralized yet. Most page-level behavior is held in local React state, which is acceptable for the current project size but should be revisited when telemetry controls, journal state, or experiment state become shared across routes. The Telemetry Calibration Console intentionally does not call the backend yet.
