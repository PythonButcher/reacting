---
name: progress-and-archive-manager
description: >-
  Enforces automatic updates to PROGRESS.md after every single step, chunk, or phase completion,
  and handles moving completed phase documentation into the archive directory so the agent does
  not read stale or completed documentation unless explicitly requested.
---

# Progress & Phase Archival Manager Skill

This skill enforces strict, automated synchronization of the project's active gate and progress tracking files, preventing metadata desynchronization and unnecessary context bloat.

---

## 1. Core Responsibilities

1. **Continuous Step Tracking:** Update `PROGRESS.md` immediately upon the completion of EVERY step or sub-chunk.
2. **Phase Completion Archival:** When a Phase is marked `COMPLETE`, move its specification file from `phases/antigravity/` (or active phase directory) into `phases/archive/antigravity/`.
3. **Active Gate Advance:** Update the active gate in `PROGRESS.md` to point to the next pending phase and step.
4. **Context Shielding:** Agents MUST NOT read from `phases/archive/` unless the user explicitly requests historical review or auditing.

---

## 2. Mandatory Step-by-Step Update Routine

Whenever a step (e.g., Step 1, Step 2) is completed:
1. Open and update `PROGRESS.md`.
2. Set the current step status to `COMPLETE`.
3. Set the subsequent step to `IN_PROGRESS` or `PENDING`.
4. Verify that target files and test/verification states in `PROGRESS.md` match disk reality.

---

## 3. Mandatory Phase Transition & Archival Routine

When all steps of a phase are verified and complete:
1. **Archive the Phase Doc:**
   - Source: `phases/antigravity/[phase_number]_[phase_name].md`
   - Destination: `phases/archive/antigravity/[phase_number]_[phase_name].md`
2. **Update `PROGRESS.md` Milestones:**
   - Record the phase as `COMPLETE` in the Session History & Milestones section.
   - Point the **Current Active Gate** to the next upcoming phase in `phases/antigravity/`.
3. **Lock Completed Phase:**
   - Do not reload or scan archived phase docs during routine operations.

---

## 4. Verification Check

Before concluding any step turn or reporting status:
- [ ] Is `PROGRESS.md` reflecting the exact state of the disk right now?
- [ ] Are completed phase docs cleanly stored in `phases/archive/`?
- [ ] Is only the current active phase being tracked in the Active Gate section?
