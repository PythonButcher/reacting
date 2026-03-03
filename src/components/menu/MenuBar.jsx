import React from 'react'
// 1. Import your "Appliance"
import DateClock from '../features/SystemClock'
import { NavLink } from 'react-router-dom'
import {FaBars} from 'react-icons/fa';



const MenuBar = ({ onToggleSidebar }) => {
  


  return (
    <>
      {/* THE SHELF: Flex container that spreads items apart */}
      <nav className="flex justify-between items-center w-full p-4 bg-gray-900 text-white border-b border-gray-700">

        {/* LEFT SIDE: Navigation Items */}
        <div className="flex items-center gap-7">
          {/* Hamburger Menu properly aligned and sized */}
          <button
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
            title="Sidebar"
            onClick={onToggleSidebar}
          >
            <FaBars className="text-2xl" />
          </button>
          
          <div className="font-bold text-xl tracking-wider">Reacting</div>
          {/* <NavigateHome /> will go here later */}
          <NavLink to="/">Home</NavLink>
          <NavLink to="/experiments">Experiments</NavLink>
          <NavLink to="/resources">Resources</NavLink>
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