import React, {  useEffect, useRef } from 'react';


const SideBar = ({ showSideBar , setShowSideBar}) => {

  const sidePanelRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !showSideBar ||!sidePanelRef.current)   
        return;
      
      // Check if the click was outside the sidebar panel
      const clickedOutsidePanel = !sidePanelRef.current.contains(event.target);

      const isHamburgerClick = event.target.closest('button[title="Toggle Sidebar"]');
      

      if (clickedOutsidePanel && !isHamburgerClick) {
        setShowSideBar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSideBar, setShowSideBar]);
    



  return (
    <>
      <div 
        ref={sidePanelRef} 
        className={`side-panel fixed inset-y-0 left-0 w-64 bg-gray-800 transform transition-transform duration-300 ${
            showSideBar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 text-white">
            Sidebar content goes here
        </div>
      </div>
    </>
  );
}

export default SideBar;