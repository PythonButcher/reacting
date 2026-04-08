import React, { useState } from 'react';
import './TestModuleCard.css';
import DeleteButton from '../buttons/DeleteButton';

/**
 * TestModuleCard component
 * Represents a single laboratory test module with meta info, operations, and results.
 */
 const TestModuleCard = ({ data, onRemove }) => {
  // State for internal interactions
  const [selectedOperation, setSelectedOperation] = useState('Anomaly Detection');
  const [selectedDataset, setSelectedDataset] = useState('dataset_alpha_v1');

  // Hardcoded options
  const operations = [
    'Anomaly Detection',
    'Matrix Scan',
    'Pattern Search'
  ];

  const datasets = [
    { id: 'dataset_alpha_v1', label: 'Dataset Alpha v.1' },
    { id: 'dataset_beta_v2', label: 'Dataset Beta v.2' },
    { id: 'dataset_gamma_v1', label: 'Dataset Gamma v.1' }
  ];

  return (
    <div className="journal-panel test-module-card">
      {/* Top Meta Section */}
      <section className="test-module-meta">
        <div className="meta-item">
           <div className="ml-auto">
              <DeleteButton onClick={onRemove} />
          </div>
          <span className="section-label">Test Name</span>
          <span className="meta-value">{data?.name || "UNNAMED_TEST"}</span>
        </div>
        <div className="meta-item">
          <span className="section-label">Test ID</span>
          <span className="meta-value">T-800-SCAN</span>
        </div>
        <div className="meta-item">
          <span className="section-label">Department</span>
          <span className="meta-value">BIOTECH_CORE</span>
        </div>
      </section>

      {/* Middle Core Section */}
      <section className="test-module-core">
        {/* Left Column: Operations */}
        <div className="operations-panel">
          <span className="section-label">Operations</span>
          {operations.map((op) => (
            <button
              key={op}
              className={`journal-button operation-button ${selectedOperation === op ? 'active' : ''}`}
              onClick={() => setSelectedOperation(op)}
            >
              {op}
            </button>
          ))}
        </div>

        {/* Right Column: Inputs */}
        <div className="inputs-panel">
          <span className="section-label">Parameters</span>
          <div className="input-group">
            <label className="text-[11px] text-text-dim uppercase tracking-wide">Target Dataset</label>
            <select
              className="journal-select"
              value={selectedDataset}
              onChange={(e) => setSelectedDataset(e.target.value)}
            >
              {datasets.map((ds) => (
                <option key={ds.id} value={ds.id}>
                  {ds.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Bottom Results Section */}
      <section className="test-module-results">
        <span>No results yet.</span>
      </section>
    </div>
  );
};

export default TestModuleCard;
