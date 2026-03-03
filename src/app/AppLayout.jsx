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
    <div className="flex flex-col min-h-screen bg-bg-main">
      {/* 1. Pass the toggle function down to MenuBar as a prop */}
      <MenuBar onToggleSidebar={handleToggleSidebar} />

      {/* 2. Pass the state and setter down to SideBar */}
      <SideBar 
        showSideBar={showSideBar} 
        setShowSideBar={setShowSideBar}
      />

      <main className="flex-1 p-4 overflow-auto">
        {/* Wrap content in a laboratory panel for a modular look */}
        <div className="journal-panel min-h-full">
          {/* The Magic Window where pages swap out */}
          <Outlet />
        </div>
      </main>
    </div>
  );
}