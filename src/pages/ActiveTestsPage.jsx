import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContextMenu from "../context/ContextMenu";
import { contextMenuCommands } from "../utils/contextMenuCommands";
import TestModuleCard from "../components/features/TestModuleCard";
import PageHeader from '../components/menu/PageHeader';
import './ActiveTestsPage.css';
import DataInventoryPanel from '../components/features/DataInventoryPanel';
import TactileSwitch from '../components/features/TactileSwitch';

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

      {/* HARDWARE CONTROL BANK — Powered by TactileSwitch Component */}
      <div className="flex flex-wrap gap-4 items-center journal-panel p-3">
        <span className="section-label mr-2">HARDWARE_CONTROLS:</span>
        <TactileSwitch
          label="MAIN_POWER"
          accentColor="#f59e0b"
          defaultOn={true}
        />
        <TactileSwitch
          label="ISOTOPE_PUMP"
          accentColor="#10b981"
        />
        <TactileSwitch
          label="LASER_SHUTTER"
          accentColor="#ef4444"
        />
      </div>

      {/* Dual Panel Grid Deck */}
      <div className="experiments-layout-deck">

        {/* LEFT COLUMN: Data Ingestion Console */}
        <div className="inventory-column">
          <DataInventoryPanel
            assets={dataAssets}
            isLoading={isLoadingAssets}
            onRefresh={fetchAssets}
          />
        </div>


        {/* RIGHT COLUMN: Active Diagnostic Modules */}
        <div className="modules-column">
          {/* Wrapping in an unstyled div is a foolproof way to stop the parent flex column from stretching this panel! */}
          <div className="w-full">
            <div className="journal-panel w-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <span className="section-label">DIAGNOSTIC_MODULES</span>
                <span className="text-[9px] font-mono text-accent-secondary">
                  ACTIVE_INSTANCES: {activeTests.length}
                </span>
              </div>

              <div className="flex flex-col gap-4">
                {activeTests.length === 0 ? (
                  <div className="text-center py-8 text-text-dim text-xs border border-dashed border-border/10 rounded-sm">
                    NO_ACTIVE_MODULES_DEPLOYED
                  </div>
                ) : (
                  activeTests.map((test) => {
                    if (!test || !test.id) return null;
                    return (
                      <TestModuleCard
                        key={test.id}
                        data={test}
                        onRemove={() => handleRemoveTest(test.id)}
                        onUpdate={(fields) => handleUpdateTest(test.id, fields)}
                      />
                    );
                  })
                )}
              </div>

              <div className="mt-6 border-t border-border/20 pt-4 flex justify-center">
                <button
                  onClick={() => handleAddTest({ name: "NEW_TEST", dept: "BIO_CORE" })}
                  className="journal-button inline-flex items-center justify-center w-max px-6 py-2 text-accent-primary uppercase font-bold text-[10px] tracking-wider"
                >
                  + DEPLOY_ADDITIONAL_MODULE
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <ContextMenu items={menuItems} />
    </div>
  );
}