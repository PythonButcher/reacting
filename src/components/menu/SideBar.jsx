import React, {  useEffect, useRef } from 'react';
import CloseButton from '../buttons/CloseButton';


const SideBar = ({ showSideBar , setShowSideBar}) => {

  const sidePanelRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !showSideBar ||!sidePanelRef.current)   
        return;
      
      // Check if the click was outside the sidebar panel
      const clickedOutsidePanel = !sidePanelRef.current.contains(event.target);

      const isHamburgerClick = event.target.closest('button[title="Sidebar"]');
      

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
        
        className={`side-panel fixed inset-y-0 left-0 w-64 bg-bg-panel border-r border-border transform transition-transform duration-300 z-50 shadow-2xl ${
            showSideBar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-border bg-bg-hover">
            <span className="text-xs font-bold tracking-widest text-accent-primary uppercase">Console_Menu</span>
            <CloseButton onClick={() => setShowSideBar(false)} />
        </div>
        
        <div className="p-4 text-text-main font-mono text-sm">
            <div className="mb-4 text-accent-secondary opacity-70">{">> "}ACCESSING_TERMINAL...</div>
            <div className="space-y-2">
                <p className="hover:text-accent-primary cursor-pointer transition-colors">OS_VERSION: 1.0.4-L</p>
                <p className="hover:text-accent-primary cursor-pointer transition-colors">SECURITY: ENCRYPTED</p>
                <p className="hover:text-accent-primary cursor-pointer transition-colors">AUTH_TOKEN: ACTIVE</p>
            </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;