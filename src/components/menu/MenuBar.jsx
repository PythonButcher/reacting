import React from 'react'
// 1. Import your "Appliance"
import DateClock from '../features/SystemClock'

const MenuBar = () => {
  return (
    // THE SHELF: Flex container that spreads items apart
    <nav className="flex justify-between items-center w-full p-4 bg-gray-900 text-white border-b border-gray-700">
      
      {/* LEFT SIDE: Future Navigation Items */}
      <div className="flex gap-4">
        <div className="font-bold text-xl tracking-wider">Reacting</div>
        {/* <NavigateHome /> will go here later */}
        {/* <ExperimentsDropdown /> will go here later */}
      </div>

      {/* RIGHT SIDE: Status Items */}
      <div className="flex items-center gap-4">
        {/* 2. Plug in your appliance */}
        <DateClock />
      </div>

    </nav>
  )
}

export default MenuBar