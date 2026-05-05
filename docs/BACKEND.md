# Backend Architecture

The backend is a local FastAPI application in `backend/main.py`. It supports the React frontend with project telemetry, weather data, and research journal persistence.

## Runtime

Run the backend with `python backend/main.py`. The server starts Uvicorn on `127.0.0.1:8000`.

The app enables CORS for frontend dev servers on localhost ports `5173` and `5174`.

## Dependencies

Backend dependencies are listed in `backend/requirements.txt`. The current set is FastAPI, Uvicorn, `httpx`, and `python-dotenv`.

## Endpoints

`GET /` returns a simple backend message.

`GET /api/weather` reads `WEATHERAPI_KEY` and `WEATHERAPI_ZIP` from the environment, calls WeatherAPI, and returns name, region, local time, temperature in Fahrenheit, and condition text. If credentials are missing, it returns an error object.

`GET /api/stats` scans the project root through `backend/backend_core/project_stats.py` and returns a `project_stats` object.

`POST /api/journal` accepts a journal entry payload with `note` and `timestamp`, then appends it to `backend/journal_vault.json`.

`GET /api/journal` returns journal entries from `backend/journal_vault.json`, newest first.

`DELETE /api/journal/{timestamp}` removes a journal entry whose timestamp matches the path value.

## Project Statistics Shape

The stats scanner returns `total_files`, `total_directories`, `total_size_bytes`, `average_file_size`, `max_directory_depth`, `file_type_distribution`, and `largest_files`.

`largest_files` contains objects with `path` and `size_bytes`.

## Local Data

`backend/journal_vault.json` is generated and mutated by the backend at runtime. It is local application state, so it is ignored by Git.

## Environment

Weather integration expects local environment variables. Store secrets in a local `.env` file and keep them out of version control. A future `backend/.env.example` can document the required variable names without storing real credentials.

## Known Backend Notes

The journal storage layer is currently JSON-file based. That is enough for local experiments, but concurrent writes can become fragile. If the journal grows into durable product behavior, move persistence to SQLite or another transactional store and expose stricter Pydantic response models.

`project_stats.py` ignores common heavy directories, but the ignore list should stay aligned with `.gitignore` as new build tools or caches are introduced.
