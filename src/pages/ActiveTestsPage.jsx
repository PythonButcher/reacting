import React, { useState } from 'react';
import ContextMenu from "../context/ContextMenu";
import { contextMenuCommands } from "../utils/contextMenuCommands";
import TestModuleCard from "../components/features/TestModuleCard";

export default function ActiveTestsPage() {
  const [activeTests, setActiveTests] = useState([]);

  const handleAddTest = (testData) => {
    const newTest = {
      ...testData,
      id: crypto.randomUUID(),
      name: testData.name || "NEW_MODULE",
      dept: testData.dept || "GENERAL_LAB",
      operation: "Anomaly Detection",
      dataset: "dataset_alpha_v1",
      status: "idle",
      timestamp: new Date().toISOString()
    };
    setActiveTests(prev => [...prev, newTest]);
  }

  const handleRemoveTest = (id) => {
    setActiveTests(prev => prev.filter(test => test.id !== id));
  }

  const handleUpdateTest = (id, fields) => {
    setActiveTests(prev => prev.map(test => 
      test.id === id ? { ...test, ...fields } : test
    ));
  }

  const menuItems = [
    { type: 'header', label: 'SYSTEM_OPTIONS' },
    ...Object.values(contextMenuCommands).map(cmd => ({
      label: `Add ${cmd.display}`,
      icon: React.createElement(cmd.icon),
      onClick: () => handleAddTest({ 
        name: cmd.display.toUpperCase(),
        dept: "AI_DIAGNOSTICS", 
        operation: cmd.display, // This matches the display name to the button
        commandAction: cmd.action // This saves the hidden "detect_outliers" action

      })
    }))
  ];

  return (
    <div className="space-y-6 journal-panel h-full">
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-bold tracking-widest text-accent-primary uppercase">ACTIVE_TESTS // EXPERIMENTS</h1>
        <p className="text-text-dim text-xs mt-1">TOTAL_MODULES: {activeTests.length} | MONITORING_ACTIVE: YES</p>
      </div>

      <div className="flex flex-col gap-6 items-center py-4">
        {activeTests.map((test) => {
          if (!test || !test.id) return null;
          return (
            <TestModuleCard 
              key={test.id} 
              data={test} 
              onRemove={() => handleRemoveTest(test.id)}
              onUpdate={(fields) => handleUpdateTest(test.id, fields)}
            />
          );
        })}
        
        <button 
          onClick={() => handleAddTest({ name: "NEW_TEST", dept: "BIO_CORE" })}
          className="journal-button inline-flex mx-auto text-accent-primary uppercase font-bold text-xs"
        >
          DEPLOY_ADDITIONAL_MODULE
        </button>
      </div>
      
      <ContextMenu items={menuItems} />
    </div>
  );
}
