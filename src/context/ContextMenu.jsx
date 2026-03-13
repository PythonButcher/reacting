import React from 'react';
import { UseContextMenu } from '../hooks/useContextMenu';

/**
 * Universal Context Menu Component
 * 
 * @param {Object} props
 * @param {Array} props.items - Array of menu items.
 */
const ContextMenu = ({ items = [] }) => {
  const { clicked, coords } = UseContextMenu();
  

  if (!clicked || items.length === 0) {
    console.log('You clicked my button....')
    return null;
 
  }

  return (
    <div 
      className="absolute z-[9999] min-w-[220px] rounded-sm py-1.5 journal-panel backdrop-blur-md"
      style={{ top: coords.y, left: coords.x }}
    >
      {items.map((item, index) => {
        if (item.type === 'header') {
          return (
            <div key={`header-${index}`} className="px-3 py-1.5 section-label">
              {item.label}
            </div>
          );
        }
        
        if (item.type === 'divider') {
          return (
            <div key={`divider-${index}`} className="h-px bg-border my-1" />
          );
        }

        return (
          <div
            key={`option-${index}`}
            className={`flex items-center px-3 py-2 cursor-pointer text-text-main transition-colors duration-150 text-sm ${
              item.disabled 
                ? 'opacity-40 cursor-not-allowed' 
                : 'hover:bg-bg-hover hover:text-accent-primary'
            }`}
            onClick={(e) => {
              if (item.disabled) {
                e.preventDefault();
                return;
              }
              if (item.onClick) {
                item.onClick(e);
              }
            }}
          >
            {item.icon && (
              <span className="mr-2 text-[16px] opacity-80 flex-shrink-0">
                {item.icon}
              </span>
            )}
            {item.label}
          </div>
        );
      })}
    </div>
  );
};

export default ContextMenu;
