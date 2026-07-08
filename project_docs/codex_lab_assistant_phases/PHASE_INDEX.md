# LAB_TERMINAL //: SELF_LEARNING_AI_IMPLEMENTATION_PLAN
## 10-Phase Laboratory Roadmap For Guided React + Python Growth

This plan is a companion roadmap for LAB_TERMINAL. It is designed for a self-learning AI code assistant that must teach the operator one step at a time, respect the local harness rules, and build useful app capabilities instead of isolated toy exercises.

The plan follows `GEMINI.md`, `project_docs/protocols/AGENT_PROTOCOL.md`, `project_docs/architecture/FRONTEND_BACKEND.md`, `project_docs/design/THEME.md`, and the local `.agents/skills/building-laboratory-ui/SKILL.md`. The operating rule is simple: each phase starts only when the operator explicitly authorizes it, each implementation step stops at its checkpoint, and the assistant explains the React or Python concept before asking for permission to continue.

When ready, the operator can type: Initiate Phase 1.

## Phase Manifest

| Phase | Codename | Primary Outcome | Core Learning |
| --- | --- | --- | --- |
| 01 | Microscope Alignment | Convert repo knowledge into an in-app laboratory orientation surface | React component anatomy, props, reading existing code safely |
| 02 | Specimen Intake Bay | Build a guided experiment intake workflow from local state and controlled forms | `useState`, controlled inputs, derived UI state, validation thinking |
| 03 | Reagent Transport Line | Standardize frontend API calls behind services and custom hooks | async React, custom hooks, Axios/fetch boundaries, separation of concerns |
| 04 | Data Vault Cleanroom | Refactor backend persistence into modular Python services and routers | FastAPI `APIRouter`, Pydantic, object-oriented Python services |
| 05 | Spectrometer Wall | Turn project, weather, journal, and inventory data into lab-grade instruments | `useMemo`, SVG/CSS visualization, data transformation |
| 06 | Containment Protocol | Add failure states, loading systems, validation, and recovery UX | error boundaries, defensive rendering, API fault handling |
| 07 | Mentor Core Uplink | Wire the Research Chatbot into a real guided-learning assistant loop | React chat state, FastAPI chat service design, prompt safety boundaries |
| 08 | Telemetry Neural Loop | Connect the calibration console to backend telemetry and event streaming | `useEffect` cleanup, SSE or polling, live state synchronization |
| 09 | Anomaly Research Wing | Add a practical Python ML-lite anomaly lab for uploaded datasets and project signals | feature engineering, z-scores, isolation-style reasoning, explainable scoring |
| 10 | Reactor Commissioning | Harden, profile, document, and polish the full system for long-term learning | performance, accessibility, build verification, project documentation |

## Assistant Response Contract

The assistant must respond like a laboratory instructor, not like a code dump generator. For each phase, it should begin with a short mission briefing, then give only Step 1. It should explain the key concept in two tight paragraphs, provide only the code needed for that step, and then stop with: Should we proceed to Step 2?

The assistant must not move to the next step until the operator says `PROCEED`, `NEXT`, or another explicit confirmation. For frontend and backend code, the assistant should teach the operator what to write and why. For CSS polish, the local rules allow the assistant to take responsibility for high-fidelity visual implementation, but it should still explain what the styles are doing.

## Design North Star

LAB_TERMINAL should feel like a real research workstation: dense, tactile, technical, readable, and alive. The roadmap should grow the existing app surface instead of replacing it. Dashboard, Active Tests, Research Journal, Telemetry Calibration, Documentation, Inventory, Weather, Stats, and Research Chatbot should become connected laboratory systems that teach React and Python through practical implementation.

The final result should not merely be a React practice app. It should be a self-documenting laboratory console where the operator learns architecture by building the instrument panel, learns Python by building the instrumentation backend, and learns basic ML by turning data into explainable anomaly signals.

## Phase Files

| Phase | File |
| --- | --- |
| 01 | `PHASE_01_MICROSCOPE_ALIGNMENT.md` |
| 02 | `PHASE_02_SPECIMEN_INTAKE_BAY.md` |
| 03 | `PHASE_03_REAGENT_TRANSPORT_LINE.md` |
| 04 | `PHASE_04_DATA_VAULT_CLEANROOM.md` |
| 05 | `PHASE_05_SPECTROMETER_WALL.md` |
| 06 | `PHASE_06_CONTAINMENT_PROTOCOL.md` |
| 07 | `PHASE_07_MENTOR_CORE_UPLINK.md` |
| 08 | `PHASE_08_TELEMETRY_NEURAL_LOOP.md` |
| 09 | `PHASE_09_ANOMALY_RESEARCH_WING.md` |
| 10 | `PHASE_10_REACTOR_COMMISSIONING.md` |

