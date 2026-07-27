# PHASE 09 //: ANOMALY_RESEARCH_WING
## Practical ML-Lite Scoring For Project And Dataset Signals

> STATUS: PENDING_AUTHORIZATION  
> DOMAIN: Python data analysis, light machine learning, and explainable UI  
> ESTIMATED STEPS: 9 to 12  
> PREREQUISITE: Phase 08

## Mission Brief

This phase gives the laboratory its research edge. The app already accepts CSV and JSON assets through the inventory panel, and the backend already scans project metadata. The Anomaly Research Wing turns those signals into explainable anomaly scores.

The first version should not be a mysterious black box. It should start with transparent statistical scoring: missing values, unusually large files, unusual row counts, file type outliers, and simple z-score style deviations. If the operator is ready, the phase can later introduce an optional unsupervised model such as Isolation Forest behind the same service boundary.

## Learning Focus

The operator learns feature engineering, normalization, z-scores, thresholds, model inputs versus labels, false positives, and explainability. The assistant should carefully distinguish basic statistics from machine learning. A z-score rule is not the same thing as a trained model, but it is often the correct first instrument.

The React portion teaches how to present model output responsibly: score, reason, evidence, confidence, and recommended next action. The UI should never display a naked score without explanation.

## Step Map

| Step | Laboratory Task | Concept |
| --- | --- | --- |
| 1 | Define what "anomaly" means for this app | problem framing |
| 2 | Select simple features from inventory and project stats | feature engineering |
| 3 | Build a Python anomaly service with rule-based scoring | transparent scoring |
| 4 | Add Pydantic response schemas for findings | explainable contracts |
| 5 | Add an anomaly router endpoint | FastAPI integration |
| 6 | Create an Anomaly Findings panel | React rendering of evidence |
| 7 | Add severity filters and sorting | derived UI state |
| 8 | Link findings to datasets or project files | traceability |
| 9 | Teach z-score theory with a real example | statistical reasoning |
| 10 | Optionally add an Isolation Forest adapter | ML model boundary |
| 11 | Compare rule-based and model-based output | evaluation mindset |
| 12 | Add a lab notebook interpretation prompt | human-in-the-loop learning |

## Target Files

| File | Intent |
| --- | --- |
| `backend/backend_core/anomaly_service.py` | Statistical and optional ML scoring service |
| `backend/routers/anomalies.py` | Findings endpoint |
| `src/components/features/AnomalyFindingsPanel.jsx` | Explainable anomaly UI |
| `src/services/labApi.js` | Anomaly API function |
| `src/pages/ActiveTestsPage.jsx` or a new route | Mount the research wing |
| `backend/requirements.txt` | Optional ML dependency only if needed |

## Assistant Teaching Contract

The assistant should not introduce a heavy ML library before a transparent baseline exists. It should teach the operator why a simple baseline is valuable: if a model cannot beat a readable rule, the model is not yet justified.

When code is introduced, comments should explain the reasoning behind feature extraction and scoring. The operator should learn not just how to run Python, but how to think about data quality and interpretation.

## Success Criteria

The phase is complete when the backend can produce explainable anomaly findings, the frontend can display those findings with evidence, and the operator can explain the difference between a feature, a score, a threshold, and a model.

## Lab Note

An anomaly detector is only impressive when it can explain itself. A glowing red warning without evidence is theater. A finding with features, thresholds, and traceable context is research.

