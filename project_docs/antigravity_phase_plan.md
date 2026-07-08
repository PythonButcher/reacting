# LAB_TERMINAL //: ANTIGRAVITY INITIATIVE
## 10-Phase Pedagogical Implementation Plan

Welcome to the Antigravity Initiative. As your AI coding assistant, we will construct advanced laboratory-themed systems. In accordance with our AGENT_PROTOCOL, we will proceed strictly one step at a time. I will teach you the core concepts of React and FastAPI, providing the theoretical framework and code skeletons, while you physically execute the engineering. 

When you are ready to begin, simply state: "Initiate Phase 1."

---

### Phase 1: Diagnostics Initialization (React State & Props)
**Objective:** Construct a "Vital Signs" monitor panel.
**Learning Focus:** Introduction to React functional components, `useState`, and passing data via `props`. 
**Action:** We will build a skeuomorphic LED status indicator that toggles between "Offline" (Dim) and "Active" (Safety Orange).

### Phase 2: Sensor Data Ingestion (FastAPI GET & Routing)
**Objective:** Engineer a backend endpoint to stream mock sensor data.
**Learning Focus:** Python FastAPI routing, basic response models, and JSON serialization.
**Action:** We will write a Python route in `backend_core` that returns mock environmental data (e.g., radiation levels, magnetic variance) for our laboratory.

### Phase 3: Telemetry Synchronization (React Side Effects)
**Objective:** Wire the frontend monitor to the backend sensor data.
**Learning Focus:** Using React's `useEffect` hook to fetch data on component mount and managing asynchronous state.
**Action:** We will build a data-fetching hook in our React component to call the new FastAPI endpoint and display the sensor data on our terminal screen.

### Phase 4: The Calibration Dial (Interactive UI & Event Handlers)
**Objective:** Construct a tactile, skeuomorphic control dial for laboratory parameters.
**Learning Focus:** Advanced React event handling (onChange, onMouseDown), and controlling input state.
**Action:** We will create a `<CalibrationDial />` component that updates a local React state value when turned, utilizing our project's hardware CSS theme and providing tactile feedback.

### Phase 5: Parameter Transmission (FastAPI POST & Pydantic)
**Objective:** Send the calibration dial's settings back to the backend servers.
**Learning Focus:** Handling POST requests in FastAPI, defining data schemas with Pydantic, and executing a POST `fetch` in React.
**Action:** We will build an endpoint to accept calibration parameters and a React handler to transmit the dial's state securely.

### Phase 6: Isotope Reactor Core (React useReducer)
**Objective:** Manage complex, multi-variable state for a simulated Isotope Reactor.
**Learning Focus:** Transitioning from `useState` to `useReducer` for predictable, action-based state management.
**Action:** We will define a reducer function to handle complex reactor actions (e.g., "INSERT_ROD", "FLUSH_COOLANT") and wire it to a master control panel UI.

### Phase 7: Control Room Architecture (React Router & Composition)
**Objective:** Integrate the reactor panel into a dedicated, navigable dashboard route.
**Learning Focus:** Client-side routing with React Router, component composition, and layout structuring.
**Action:** We will register a new route in `src/app/router.jsx` and assemble our previous components into a cohesive `ReactorDashboard` page.

### Phase 8: Anomaly Detection (Polling & Cleanup)
**Objective:** Implement a system to detect and flash warnings for reactor anomalies.
**Learning Focus:** Setting up intervals in `useEffect` and the critical importance of cleanup functions to prevent memory leaks.
**Action:** We will create a hook that polls the backend for anomaly flags and triggers a flashing CSS keyframe alert animation on the frontend.

### Phase 9: Secure Terminal Override (Forms & Validation)
**Objective:** Build a lock screen requiring a technician passcode to access sensitive data.
**Learning Focus:** Form state management, input validation, and conditional rendering.
**Action:** We will create a secure form component that conditionally renders the sensitive data panels only if the correct hardware-stylized passcode is entered.

### Phase 10: Global Protocol Override (React Context API)
**Objective:** Implement a "Defcon" global status that affects the entire application's theme and behavior.
**Learning Focus:** Using the React Context API to avoid prop-drilling and manage global application state.
**Action:** We will wrap our application in a `StatusContext`, allowing any component to switch the lab's visual theme (e.g., turning all accents to emergency red) based on the global threat level.
