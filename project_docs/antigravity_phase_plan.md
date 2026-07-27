# LAB_TERMINAL //: ANTIGRAVITY INITIATIVE
## 10-Phase Pedagogical Implementation Plan

Welcome to the Antigravity Initiative. As your AI coding assistant, we will construct advanced, hardware-inspired UI systems. In accordance with our AGENT_PROTOCOL, we will proceed strictly one step at a time. I will teach you the core concepts of React and FastAPI, providing the theoretical framework and code skeletons, while you physically execute the engineering. 

When you are ready to begin, simply state: "Initiate Phase 1."

---

### Phase 1: LED Status Indicator (React State & Props)
**Objective:** Construct a togglable, glowing LED indicator component.
**Learning Focus:** Introduction to React functional components, `useState`, and passing data via `props`. 
**Action:** We will build a sleek LED component that changes color and glow intensity when clicked, and mount it into an active page to pass dynamic props and verify it live in the UI.


### Phase 2: System Uptime Endpoint (FastAPI GET)
**Objective:** Engineer a backend endpoint to serve system data.
**Learning Focus:** Python FastAPI routing, basic response models, and JSON serialization.
**Action:** We will write a Python route in `backend_core` that returns mock system data, such as uptime, active connections, and memory usage.

### Phase 3: Telemetry Panel (React Side Effects)
**Objective:** Wire a frontend display panel to our backend system data.
**Learning Focus:** Using React's `useEffect` hook to fetch data on component mount and managing asynchronous state.
**Action:** We will build a data-fetching hook in React to call the FastAPI endpoint and display the data inside a clean, mono-spaced terminal window component.

### Phase 4: Rotary Knob Component (Interactive UI & Event Handlers)
**Objective:** Construct a tactile rotary dial to control a numerical value.
**Learning Focus:** Advanced React event handling (mouse down, drag), math for UI, and controlling input state.
**Action:** We will create a `<RotaryKnob />` component that updates a local React state value when dragged, complete with visual ticks and CSS rotation.

### Phase 5: Setting Transmission (FastAPI POST & Pydantic)
**Objective:** Send the rotary knob's settings back to the backend.
**Learning Focus:** Handling POST requests in FastAPI, defining data schemas with Pydantic, and executing a POST `fetch` in React.
**Action:** We will build a backend endpoint to accept our knob's value and a React handler to transmit the state securely whenever it changes.

### Phase 6: Interlocking Switch Bank (React useReducer)
**Objective:** Manage a complex bank of toggle switches where some switches depend on others.
**Learning Focus:** Transitioning from `useState` to `useReducer` for predictable, action-based state management.
**Action:** We will build a `<SwitchBank />` component and define a reducer function so that flipping the "Master" switch automatically toggles the secondary switches.

### Phase 7: Dashboard Routing (React Router)
**Objective:** Organize our hardware components into dedicated, navigable screens.
**Learning Focus:** Client-side routing with React Router, component composition, and layout structuring.
**Action:** We will register new routes in `src/app/router.jsx` to separate our UI into a "Telemetry" view and a "Controls" view.

### Phase 8: Live Activity Console (Polling & Cleanup)
**Objective:** Implement a scrolling feed of live system events.
**Learning Focus:** Setting up intervals in `useEffect` and the critical importance of cleanup functions to prevent memory leaks.
**Action:** We will create a hook that polls the backend for new event logs and appends them to a simulated, auto-scrolling terminal console.

### Phase 9: Keypad Lock Screen (Forms & Validation)
**Objective:** Build a secure keypad component requiring a passcode.
**Learning Focus:** Form state management, input validation, and conditional rendering.
**Action:** We will create a tactile numeric keypad that conditionally reveals a hidden component only if the correct 4-digit code is entered.

### Phase 10: Master Theme Override (React Context API)
**Objective:** Implement a global switch that alters the application's accent colors (e.g., from Amber to Cyan).
**Learning Focus:** Using the React Context API to avoid prop-drilling and manage global application state.
**Action:** We will wrap our application in a `ThemeContext`, allowing our switch components to change CSS variables globally across the entire UI.
