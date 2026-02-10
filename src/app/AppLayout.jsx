// AppLayout is the permanent shell of the application
// No experiments go here. Only layout and navigation.

import { Outlet, Link } from "react-router-dom";
import "./App.css";

export default function AppLayout() {
  return (
    <div>
      <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
        <Link to="/">Home</Link>{" "}
        <Link to="/experiments">Experiments</Link>
      </nav>

      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
}
