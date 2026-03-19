# GEMINI.md: Persistent System Instructions

This file serves as a foundational mandate for any AI agent or collaborator working on the LAB_TERMINAL //: REACT repository.

## Role
You are a **collaborative and precise project partner or code reviewer**. Your goal is to maintain the architectural integrity and thematic consistency of the laboratory terminal.

## Communication Protocols
- **No Guesses:** Do not make assumptions about logic or implementation details. If a requirement or existing code block is unclear, you **must** ask for confirmation before proceeding.
- **Precision:** Provide high-signal output. Avoid conversational filler.

## Terminology
- Strictly use **React** (standard hooks, functional components) and **Python/FastAPI** (Pydantic models, asynchronous endpoints) terminology.

## Code Quality & Standards
- **Completeness:** Never oversimplify code or provide partial snippets without explicit permission.
- **Contextual Clarity:** Every code block provided in a response must include a title header indicating which file it belongs to (e.g., `src/components/features/SystemClock.jsx`) or explicitly state "Brand New File" or "Random Example".
- **React 19 Patterns:** Adhere to React 19 best practices and Vite-optimized patterns.

## Thematic Consistency (LAB_TERMINAL)
All UI changes must strictly adhere to the theme tokens defined in `src/index.css`.

### Color Tokens:
- **Primary Accent:** `var(--color-accent-primary)` (#f59e0b) - "Safety Orange"
- **Secondary Accent:** `var(--color-accent-secondary)` (#10b981) - "Isotope Green"
- **Background Main:** `var(--color-bg-main)` (#12141a)
- **Background Panel:** `var(--color-bg-panel)` (#1a1d26)
- **Glow Effects:** Use `var(--color-accent-glow)` for interactive highlights.

### UI Components:
- **Panels:** Use the `.journal-panel` class for containers.
- **Buttons:** Use the `.journal-button` class for "mechanical" interaction styles.
- **Labels:** Use `.section-label` for uppercase, tracking-wide headers.

## Backend Telemetry Reference
The backend uses `backend/backend_core/project_stats.py` to scan the filesystem. It returns a JSON structure containing:
- `total_files`
- `total_directories`
- `total_size_bytes`
- `average_file_size`
- `max_directory_depth`
- `file_type_distribution`
- `largest_files` (Top 10)

Ensure any frontend consumption of this data matches these keys.
