import React from 'react'
// 1. Import your "Appliance"
import DateClock from '../features/SystemClock'
import { NavLink } from 'react-router-dom'
import {FaBars} from 'react-icons/fa';

const MenuBar = ({ onToggleSidebar }) => {
  return (
    <>
      {/* THE SHELF: Flex container that spreads items apart */}
      <nav className="flex justify-between items-center w-full p-4 bg-bg-panel text-white border-b border-border border-t-2 border-t-[#f59e0b] shadow-lg">

        {/* LEFT SIDE: Navigation Items */}
        <div className="flex items-center gap-7">
          {/* Hamburger Menu properly aligned and sized */}
          <button
            className="p-2 text-gray-400 hover:text-accent-primary hover:bg-bg-hover rounded-sm transition-colors cursor-pointer"
            title="Sidebar"
            onClick={onToggleSidebar}
          >
            <FaBars className="text-2xl" />
          </button>
          
          <div className="font-bold text-xl tracking-wider text-accent-primary">LAB_TERMINAL //: REACT</div>
          {/* <NavigateHome /> will go here later */}
          <NavLink to="/" className={({ isActive }) => `text-sm tracking-widest hover:text-accent-secondary transition-colors ${isActive ? 'text-accent-secondary' : 'text-text-dim'}`}>DASHBOARD</NavLink>
          <NavLink to="/experiments" className={({ isActive }) => `text-sm tracking-widest hover:text-accent-secondary transition-colors ${isActive ? 'text-accent-secondary' : 'text-text-dim'}`}>ACTIVE_TESTS</NavLink>
          <NavLink to="/resources" className={({ isActive }) => `text-sm tracking-widest hover:text-accent-secondary transition-colors ${isActive ? 'text-accent-secondary' : 'text-text-dim'}`}>DOCUMENTATION</NavLink>
        </div>

        {/* RIGHT SIDE: Status Items */}
        <div className="flex items-center gap-4">
          {/* 2. Plug in your appliance */}
          <DateClock />
        </div>
      </nav>
    </>
  );
}

export default MenuBar;