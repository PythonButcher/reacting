import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContextMenu from "../context/ContextMenu";
import { contextMenuCommands } from "../utils/contextMenuCommands";
import TestModuleCard from "../components/features/TestModuleCard";
import PageHeader from '../components/menu/PageHeader';
import './ActiveTestsPage.css';

export default function ActiveTestsPage() {
  // === STATE HOOKS ===
  const [dataAssets, setDataAssets] = useState([]);
  const [isLoadingAssets, setIsLoadingAssets] = useState(true);
  const [activeTests, setActiveTests] = useState([]);

  // === DATA FETCH LOGIC ===
  /**
   * Fetches the data inventory registry from the FastAPI backend.
   */
  const fetchAssets = async () => {
    try {
      setIsLoadingAssets(true);
      const response = await axios.get('http://127.0.0.1:8000/api/inventory');
      setDataAssets(response.data);
    } catch (err) {
      console.error("FAILED_TO_LOAD_INVENTORY:", err);
    } finally {
      setIsLoadingAssets(false);
    }
  };

  // === SIDE EFFECT HOOK ===
  useEffect(() => {
    fetchAssets();
  }, []); 

  // Handlers for deploying and adjusting modules
  const handleAddTest = (testData) => {
    const newTest = {
      ...testData,
      id: crypto.randomUUID(),
      name: testData.name || "NEW_MODULE",
      dept: testData.dept || "GENERAL_LAB",
      operation: testData.operation || "Anomaly Detection",
      dataset: null,
      fileSize: null,
      fileType: null,
      status: 'READY',
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
        operation: cmd.display 
      })
    }))
  ];

  return (
    <div className="space-y-6 journal-panel h-full">
      <PageHeader 
        title="ACTIVE_TESTS // EXPERIMENTS"
        statusText={`TOTAL_MODULES: ${activeTests.length} | MONITORING_ACTIVE: YES`}
      />

      {/* Dual Panel Grid Deck */}
      <div className="experiments-layout-deck">
        
        {/* LEFT COLUMN: Data Ingestion Console */}
        <div className="inventory-column">
          <div className="journal-panel text-xs text-text-dim text-center py-12 border-dashed">
            <span>DATA_INVENTORY_PANEL // [PENDING_STEP_3]</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Active Diagnostic Modules */}
        <div className="modules-column">
          <div className="flex flex-col gap-6 items-center">
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
        </div>

      </div>
      
      <ContextMenu items={menuItems} />
    </div>
  );
}