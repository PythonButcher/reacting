import React, { useEffect, useState } from 'react';
import './TestModuleCard.css';
import DeleteButton from '../buttons/DeleteButton';

/**
 * TestModuleCard component
 * Represents a single laboratory test module with meta info, operations, and results.
 */
const TestModuleCard = ({ data, onRemove, onUpdate }) => {
  const [progress, setProgress] = useState(0);

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

  // High-fidelity scan simulation
  useEffect(() => {
    let interval;
    if (data.status === 'ANALYZING') {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((old) => {
          if (old >= 100) {
            clearInterval(interval);
            onUpdate({ 
              status: 'COMPLETED', 
              results: `SCAN_COMPLETE // DATA_BLOCK_${Math.floor(Math.random() * 9000) + 1000}_VERIFIED` 
            });
            return 100;
          }
          return old + 4; // Increments by 4% every 100ms
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [data.status, onUpdate]);

  if (!data) return null;

  return (
    <div className="journal-panel test-module-card">
      {/* Top Meta Section */}
      <section className="test-module-meta">
        <div className="meta-item">
          <span className="section-label">Test Name</span>
          <input
            className="meta-input"
            value={data.name || ""}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder="ENTER_NAME..."
          />
        </div>
        <div className="meta-item">
          <span className="section-label">Test ID</span>
          <span className="meta-value text-accent-primary">
            {data.id ? `ID_${data.id.toString().slice(0, 8)}` : "GENERIC_SCAN"}
          </span>
        </div>
        <div className="meta-item">
          <span className="section-label">Department</span>
          <input
            className="meta-input uppercase"
            value={data.dept || ""}
            onChange={(e) => onUpdate({ dept: e.target.value })}
            placeholder="SPECIFY_DEPT..."
          />
        </div>
        <div className="ml-auto">
          <DeleteButton onClick={onRemove} />
        </div>
      </section>

      {/* Middle Core Section */}
      <section className="test-module-core">
        {/* Left Column: Operations */}
        <div className="operations-panel">
          <span className="section-label">Operations</span>
          <div className="flex flex-col gap-1">
            {operations.map((op) => (
              <button
                key={op}
                className={`journal-button operation-button ${data.operation === op ? 'active' : ''}`}
                onClick={() => onUpdate({ operation: op })}
              >
                {op}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Inputs */}
        <div className="inputs-panel">
          <span className="section-label">Parameters</span>
          <div className="input-group">
            <label className="text-[11px] text-text-dim uppercase tracking-wide">Target Dataset</label>
            <select
              className="journal-select"
              value={data.dataset || "dataset_alpha_v1"}
              onChange={(e) => onUpdate({ dataset: e.target.value })}
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
        <div className="results-header">
          <span className="section-label">Diagnostic Output</span>
          {data.status !== 'ANALYZING' && (
            <button 
              className="journal-button run-button" 
              onClick={() => onUpdate({ status: 'ANALYZING', results: null })}
            >
              [ RUN_DIAGNOSTIC ]
            </button>
          )}
        </div>

        <div className="terminal-window">
          <div className="status-line">
            <span className="status-label">SYS_STATUS:</span>
            <span className={`status-value ${data.status === 'ANALYZING' ? 'pulse' : ''}`}>
              {data.status || 'READY'}
            </span>
            <span className="timestamp-label">{data.timestamp ? new Date(data.timestamp).toLocaleTimeString() : 'N/A'}</span>
          </div>

          {data.status === 'ANALYZING' && (
            <div className="progress-container">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
          )}

          <div className="log-text">
             {data.status === 'ANALYZING' ? `>>> BUFFERING_DATA... ${progress}%` : (data.results || ">>> STANDBY: PENDING_USER_INPUT")}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestModuleCard;
