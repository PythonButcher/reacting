import React, { useState } from 'react';
import ContextMenu from "../context/ContextMenu";
import { contextMenuCommands } from "../utils/contextMenuCommands";
import TestModuleCard from "../components/features/TestModuleCard";

export default function ActiveTestsPage() {
  const [activeTests, setActiveTests] = useState([]);

  const handleAddTest = (testData) => {
  setActiveTests(prev => [...prev, testData])
}
  const handleRemoveTest = (id) => {
    setActiveTests(prev => prev.filter(test => test.id !== id))
  }



  const menuItems = [
    { type: 'header', label: 'SYSTEM_OPTIONS' },
    ...Object.values(contextMenuCommands).map(cmd => ({
      label: `Add ${cmd.display}`,
      icon: React.createElement(cmd.icon),
      onClick: () => console.log(`Triggered ${cmd.command}`)
    }))
  ];

  return (
    <div className="space-y-6 journal-panel h-full">
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-bold tracking-widest text-accent-primary uppercase">ACTIVE_TESTS // EXPERIMENTS</h1>
        <p className="text-text-dim text-xs mt-1">TOTAL_MODULES: 1 | MONITORING_ACTIVE: YES</p>
      </div>

      <div className="flex flex-col gap-6 items-center py-4">

      {activeTests.map((test) => (
      <TestModuleCard 
        key={test.id} 
        data={test} 
        onRemove={() => handleRemoveTest(test.id)}
      />
   ))}
        
      <button
        onClick={() => handleAddTest({
          id: Date.now(),
          name: "NEW_MODULE",
          type: "SYSTEM_SCAN"
        })}
        className="journal-button inline-flex mx-auto text-accent-primary uppercase font-bold text-xs"
      >
      DEPLOY_ADDITIONAL_MODULE
    </button>
      </div>
      
      <ContextMenu items={menuItems} />
    </div>
  );
}
