# Git Ignore Policy

The `.gitignore` file keeps the repository focused on source code, documentation, and intentional assets. Generated files, dependency folders, local secrets, and runtime data should stay out of version control.

## Ignored Runtime and Build Files

Node dependencies are ignored through `node_modules/`. Vite build output is ignored through `dist/`, `dist-ssr/`, `.vite/`, and `coverage/`.

Python runtime artifacts are ignored through `__pycache__/`, `*.py[cod]`, `.pytest_cache/`, `.ruff_cache/`, `.mypy_cache/`, `.coverage`, and `htmlcov/`.

Python virtual environments are ignored through `.venv/`, `venv/`, and `env/`.

## Ignored Local Data

`backend/journal_vault.json` is ignored because the FastAPI server creates and mutates it as local journal state. If a sample journal file is needed later, add a separate sanitized fixture or example file instead of tracking the runtime vault.

## Ignored Secrets

`.env` and `.env.*` files are ignored so API keys and local configuration do not enter Git. Example files are explicitly allowed through `!.env.example` and `!backend/.env.example`.

## Maintenance

If a new tool adds generated files or cache directories, update `.gitignore` at the same time the tool is introduced. If a generated file is already tracked, `.gitignore` will not remove it from Git history or the index; it must be untracked intentionally in a separate Git operation.
