# LAB_TERMINAL //: REACT.

A modular laboratory environment for React experiments featuring a mechanical terminal-inspired UI.

## Tech Stack

- **Frontend:** React 19, Vite, React Router, Tailwind CSS v4 (using the `@tailwindcss/vite` plugin).
- **Backend:** Python FastAPI server providing system telemetry and project-wide filesystem statistics.

## Key Features

- **Dashboard:** Central command with live backend data connection status and terminal logs.
- **Project Information:** Real-time filesystem metrics (total files, size, largest files) scanned via a custom Python utility (`project_stats.py`). It calculates metrics like average file size, directory depth, and file type distribution while ignoring heavy directories like `node_modules` and `.git`.
- **System Clock:** High-performance live clock using `Intl.DateTimeFormat`.
- **UI Components:** Custom "Laboratory Panel" layout, "Mechanical" buttons, and an orange/green safety-themed terminal aesthetic.

## UI Theme Tokens

The project uses a specific set of theme tokens defined in `src/index.css`:

- **Safety Orange:** `--color-accent-primary` (#f59e0b) - Used for primary actions and highlights.
- **Isotope Green:** `--color-accent-secondary` (#10b981) - Used for success states and secondary accents.
- **Backgrounds:** `--color-bg-main` (#12141a) and `--color-bg-panel` (#1a1d26).
- **Typography:** Monochrome/Mono-spaced font stack for that terminal feel.

## Getting Started

### Prerequisites
- Node.js (Latest LTS)
- Python 3.10+

### Installation

1. Install Frontend dependencies:
   ```bash
   npm install
   ```

2. Install Backend dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```

### Running the Project

1. Start the Vite dev server:
   ```bash
   npm run dev
   ```

2. Start the FastAPI backend:
   ```bash
   python backend/main.py
   ```
