import React, { useEffect, useState } from 'react';
import './TestModuleCard.css';
import DeleteButton from '../buttons/DeleteButton';
import FileIngestion from './FileIngestion';

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
              results: `SCAN_COMPLETE // SOURCE: ${data.dataset?.toUpperCase()} // INTEGRITY_VERIFIED` 
            });
            return 100;
          }
          // Dynamic speed based on file size
          const sizeNum = parseFloat(data.fileSize) || 5;
          const increment = Math.max(1, Math.min(10, 25 / (sizeNum / 2))); 
          return old + increment;
        });
      }, 120);
    }
    return () => clearInterval(interval);
  }, [data.status, data.dataset, data.fileSize, onUpdate]);

  if (!data) return null;

  return (
    <div className="journal-panel test-module-card animate-in">
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
          <span className="meta-value text-accent-primary font-bold">
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
        <div className="ml-auto pt-1">
          <DeleteButton onClick={onRemove} />
        </div>
      </section>

      <section className="test-module-core">
        <div className="operations-panel">
          <span className="section-label">Operations</span>
          <div className="button-grid">
            {operations.map((op) => (
              <button
                key={op}
                className={`journal-button operation-button ${data.operation === op ? 'active' : ''}`}
                onClick={() => onUpdate({ 
                  operation: op, 
                  status: 'ANALYZING',
                  results: null
                })}
              >
                {op}
              </button>
            ))}
          </div>
        </div>

        <div className="inputs-panel">
          <span className="section-label">Data Ingestion</span>
          <FileIngestion 
            dataset={data.dataset}
            fileSize={data.fileSize}
            fileType={data.fileType}
            onFileSelect={(file) => onUpdate({
              dataset: file.name,
              fileSize: file.size,
              fileType: file.type,
              status: 'READY'
            })}
            onFileClear={() => onUpdate({
              dataset: null,
              fileSize: null,
              fileType: null,
              status: 'READY',
              results: null
            })}
          />
        </div>
      </section>

      <section className="test-module-results">
        <div className="results-header">
          <span className="section-label">Diagnostic Output</span>
          {data.status !== 'ANALYZING' && (
            <button 
              className={`run-button ${!data.dataset ? 'disabled' : ''}`}
              disabled={!data.dataset}
              onClick={() => onUpdate({ status: 'ANALYZING', results: null })}
            >
              [ EXECUTE_SCAN ]
            </button>
          )}
        </div>

        <div className="terminal-window">
          <div className="status-line">
            <span className="status-label">SYS_STATUS:</span>
            <span className={`status-value ${data.status === 'ANALYZING' ? 'pulse' : ''}`}>
              {data.status || 'READY'}
            </span>
            <span className="timestamp-label ml-auto">{data.timestamp ? new Date(data.timestamp).toLocaleTimeString() : 'N/A'}</span>
          </div>

          {data.status === 'ANALYZING' && (
            <div className="progress-container">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
          )}

          <div className="log-text">
             {!data.dataset ? ">>> ERROR: SOURCE_NOT_FOUND" : (
               data.status === 'ANALYZING' ? `>>> BUFFERING_DATA... ${Math.floor(progress)}%` : (data.results || ">>> SYSTEM_READY: PENDING_EXECUTION")
             )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestModuleCard;
