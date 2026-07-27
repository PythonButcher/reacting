# LAB_TERMINAL //: Makefile

.PHONY: help dev-frontend dev-backend lint build check

help:
	@echo "Available commands:"
	@echo "  make dev-frontend  - Launch React/Vite frontend (http://localhost:5173)"
	@echo "  make dev-backend   - Launch FastAPI backend service (http://127.0.0.1:8000)"
	@echo "  make lint          - Run ESLint on frontend codebase"
	@echo "  make build         - Build production Vite distribution"
	@echo "  make check         - Execute full verification suite (lint + build)"

dev-frontend:
	npm run dev

dev-backend:
	python backend/main.py

lint:
	npm run lint

build:
	npm run build

check: lint build
