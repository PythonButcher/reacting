# Visual System & Hardware Theme (src/THEME.md)

## Aesthetic Guidelines
Aesthetic: Highly skeuomorphic, retro-laboratory hardware interface.
Design Language: Precise labels, compact panels, restrained glow, monospace typography, dark mechanical surfaces, tactile controls (dials, levers, knobs, glowing LEDs).

## Core Design Tokens (`src/index.css`)
- `--color-accent-primary`: Safety Orange (`#ff5722` / HSL tuned)
- `--color-accent-secondary`: Isotope Green (`#00e676` / HSL tuned)
- `--color-bg-main`: Dark Obsidian / Terminal surface
- `--color-bg-panel`: Recessed metallic panel background
- `--color-text-main`: Crisp monospace primary text
- `--color-text-dim`: Dimmed interface labels

## Tools & Classes
- Tailwind CSS v4 + custom CSS variables in `src/index.css`.
- Shared utility classes: `.journal-panel`, `.journal-button`, `.journal-select`, `.section-label`.

## AI Mandate & CSS Delegation
The AI assumes full responsibility for implementing and polishing complex CSS to match this hardware aesthetic directly in `src/index.css`.
