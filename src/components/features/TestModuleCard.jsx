import React from 'react';
import './TestModuleCard.css';
import DeleteButton from '../buttons/DeleteButton';

/**
 * TestModuleCard component
 * Represents a single laboratory test module with meta info, operations, and results.
 */
const TestModuleCard = ({ data, onRemove, onUpdate }) => {
  
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
      <section className="test-module-results border-t border-border mt-4 pt-2">
        <span className="text-[10px] text-text-dim uppercase tracking-tighter">
          STATUS: {data.status || 'READY'} // TIMESTAMP: {data.timestamp ? new Date(data.timestamp).toLocaleTimeString() : 'N/A'}
        </span>
      </section>
    </div>
  );
};

export default TestModuleCard;
