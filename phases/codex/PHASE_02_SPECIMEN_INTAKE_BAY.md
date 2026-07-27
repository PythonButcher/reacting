# PHASE 02 //: SPECIMEN_INTAKE_BAY
## Controlled Forms, Local State, And Experiment Registration UX

> STATUS: PENDING_AUTHORIZATION  
> DOMAIN: React state and form design  
> ESTIMATED STEPS: 7 to 9  
> PREREQUISITE: Phase 01

## Mission Brief

Every laboratory needs a disciplined intake bay. Samples need names, labels, hazards, linked datasets, and an initial hypothesis before they enter the system. This phase turns the current Active Tests workflow into a more intentional experiment intake flow while teaching the operator how React state makes an interface reactive.

The current `ActiveTestsPage.jsx` already creates local test modules and the `DataInventoryPanel` already loads registered assets from FastAPI. This phase connects those ideas at the UI level: the operator builds an intake form that can create an experiment module with a selected dataset, operation mode, priority, and operator note.

## Learning Focus

The operator learns `useState`, controlled inputs, form submission, derived state, validation, and immutable updates. The assistant should teach why a text box must be controlled when the UI needs to inspect, validate, or transform the value before submission.

The Python portion is still observational. The assistant should point out that inventory assets already come from `/api/inventory`, but it should keep this phase focused on frontend state and leave backend experiment persistence for Phase 04.

## Step Map

| Step | Laboratory Task | Concept |
| --- | --- | --- |
| 1 | Inspect `ActiveTestsPage` state and handlers | local state and immutable arrays |
| 2 | Design an experiment intake data model | shape-first React thinking |
| 3 | Build controlled fields for name, operation, and priority | `value`, `onChange`, form state |
| 4 | Add dataset selection from `dataAssets` | parent data passed into a form |
| 5 | Compute validation and disabled states | derived booleans, user feedback |
| 6 | Submit a new experiment module | event handling and object creation |
| 7 | Refactor repeated module defaults into a helper | readable component logic |
| 8 | Add tactile lab styling | forms that feel like hardware controls |
| 9 | Review the state flow aloud | operator recall checkpoint |

## Target Files

| File | Intent |
| --- | --- |
| `src/components/features/ExperimentIntakeBay.jsx` | New controlled form component |
| `src/pages/ActiveTestsPage.jsx` | Replace the generic deploy button with guided intake |
| `src/components/features/TestModuleCard.jsx` | Display selected dataset and priority if needed |
| `src/index.css` or local CSS | Mechanical intake bay styling |

## Assistant Teaching Contract

The assistant should never dump the full completed form at once. It should teach one controlled field first, stop, then add the next field after confirmation. The operator should physically see how each field joins the same state object.

When validation appears, the assistant should explain the difference between stored state and derived state. Stored state is what the user typed. Derived state is what the component can calculate from that input during render.

## Success Criteria

The phase is complete when the operator can build a controlled input without guessing, explain why direct mutation of `activeTests` is unsafe, and create a new experiment module that carries meaningful metadata from the intake bay into the module deck.

## Lab Note

A mislabeled specimen ruins an experiment before the experiment begins. A careless form does the same thing to state. The intake bay makes data explicit before it enters the system.

