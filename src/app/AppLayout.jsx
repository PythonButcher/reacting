// AppLayout is the permanent shell of the application
// No experiments go here. Only layout and navigation.

import { Outlet } from "react-router-dom";
import MenuBar from "../components/menu/MenuBar";
import "./App.css";

export default function AppLayout() {
  return (
    <div>
      {/* The Shelf is now hung on the wall */}
      <MenuBar />

      <main style={{ padding: "1rem" }}>
        {/* The Magic Window where pages swap out */}
        <Outlet />
      </main>
    </div>
  );
}