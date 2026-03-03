import React, { useState } from 'react';
// AppLayout is the permanent shell of the application
// No experiments go here. Only layout and navigation.

import { Outlet } from "react-router-dom";
import MenuBar from "../components/menu/MenuBar";
import SideBar from '../components/menu/SideBar';
import "./App.css";

export default function AppLayout() {

  // state for sidebar
  const [showSideBar, setShowSideBar] = useState(false);

  // The toggle function lives here
  const handleToggleSidebar = () => {
    setShowSideBar(prev => !prev);
  }

  return (
    <div>
      {/* 1. Pass the toggle function down to MenuBar as a prop */}
      <MenuBar onToggleSidebar={handleToggleSidebar} />

      {/* 2. Pass the state and setter down to SideBar */}
      <SideBar 
        showSideBar={showSideBar} 
        setShowSideBar={setShowSideBar}
      />

      <main style={{ padding: "1rem" }}>
        {/* The Magic Window where pages swap out */}
        <Outlet />
      </main>
    </div>
  );
}