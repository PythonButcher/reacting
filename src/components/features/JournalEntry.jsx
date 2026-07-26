import { useState } from 'react';
import './JournalEntry.css';

function JournalEntry({ onLogCommitted }) {
  // STATE HOOKS
  const [entry, setEntry] = useState("");
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [operator, setOperator] = useState("OPR-802");
  const [classification, setClassification] = useState("RESTRICTED");
  const [moduleArea, setModuleArea] = useState("GENERAL_LAB");
  const [systemAlert, setSystemAlert] = useState(false);

  // HANDLERS
  const handleCommit = async () => {
    if (!entry.trim()) return; 
    
    setIsTransmitting(true);
    
    // Format the note to inject metadata headers
    const alertTag = systemAlert ? " [ALERT: CRITICAL_OVERRIDE]" : "";
    const formattedNote = `[OPERATOR: ${operator}] [SECURITY: ${classification}] [MODULE: ${moduleArea}]${alertTag}\n\n${entry}`;

    const payload = {
      note: formattedNote,
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/journal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setEntry(""); 
        if (onLogCommitted) {
          onLogCommitted();
        }
      } else {
        console.error("TRANSMISSION_FAILED:", response.status);
      }
    } catch (error) {
      console.error("NETWORK_ERROR:", error);
    } finally {
      setIsTransmitting(false);
    }
  };

  const handleClear = () => {
    if (window.confirm("CLEAR_BUFFER? All unsaved data will be lost.")) {
      setEntry("");
    }
  };

  const handleAlertToggle = () => {
    const nextState = !systemAlert;
    setSystemAlert(nextState);
    if (nextState) {
      setClassification("TOP_SECRET");
    } else {
      setClassification("RESTRICTED");
    }
  };

  const addTag = (tag) => {
    setEntry(prev => prev ? `${prev} [${tag}]` : `[${tag}] `);
  };

  return (
    <div className="flex flex-col h-full w-full group">
      {/* Control Panel Grid Header */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 bg-bg-panel/40 p-3 border border-border/20 rounded-sm">
        <div className="flex flex-col gap-1">
          <label className="text-[8px] font-mono font-bold text-accent-primary uppercase tracking-wider">Operator_ID</label>
          <input 
            type="text" 
            className="journal-input-field w-full text-xs" 
            value={operator}
            onChange={(e) => setOperator(e.target.value.toUpperCase())}
            placeholder="OPR-000"
            disabled={isTransmitting}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[8px] font-mono font-bold text-accent-primary uppercase tracking-wider">Subsystem</label>
          <select 
            className="journal-select h-[26px] py-0 px-2 text-xs w-full"
            value={moduleArea}
            onChange={(e) => setModuleArea(e.target.value)}
            disabled={isTransmitting}
          >
            <option value="GENERAL_LAB">GENERAL_LAB</option>
            <option value="DASHBOARD">DASHBOARD</option>
            <option value="ACTIVE_TESTS">ACTIVE_TESTS</option>
            <option value="TELEMETRY">TELEMETRY</option>
            <option value="DATA_VAULT">DATA_VAULT</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[8px] font-mono font-bold text-accent-primary uppercase tracking-wider">Classification</label>
          <select 
            className="journal-select h-[26px] py-0 px-2 text-xs w-full"
            value={classification}
            onChange={(e) => setClassification(e.target.value)}
            disabled={isTransmitting || systemAlert}
          >
            <option value="UNCLASSIFIED">UNCLASSIFIED</option>
            <option value="RESTRICTED">RESTRICTED</option>
            <option value="CONFIDENTIAL">CONFIDENTIAL</option>
            <option value="SECRET">SECRET</option>
            <option value="TOP_SECRET">TOP_SECRET</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 justify-center">
          <label className="text-[8px] font-mono font-bold text-accent-primary uppercase tracking-wider mb-1">System_Alert</label>
          <div className="tactile-switch-container" onClick={handleAlertToggle}>
            <div className={`tactile-switch-track ${systemAlert ? 'active' : ''}`}>
              <div className="tactile-switch-handle"></div>
            </div>
            <span className={`tactile-switch-label ${systemAlert ? 'text-red-400 font-bold' : 'text-text-dim/60'}`}>
              {systemAlert ? 'OVERRIDE' : 'NORMAL'}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Tags Header */}
      <div className="flex gap-2 mb-3 overflow-x-auto pb-1 no-scrollbar">
        {['INFO', 'RESEARCH', 'ANOMALY', 'CRITICAL'].map(tag => (
          <button
            key={tag}
            onClick={() => addTag(tag)}
            className="text-[9px] px-2 py-0.5 border border-border/40 hover:border-accent-secondary hover:text-accent-secondary transition-colors cursor-pointer uppercase tracking-tighter bg-bg-panel/50"
          >
            +{tag}
          </button>
        ))}
      </div>

      {/* Terminal Screen Input Area */}
      <div className="flex-1 relative mb-4">
        <div className={`w-full h-full crt-container crt-flicker ${systemAlert ? 'alert-mode' : ''}`}>
          <div className={`crt-sweep ${systemAlert ? 'alert-mode' : ''}`}></div>
          <textarea
            className={`w-full h-full p-4 outline-none resize-none font-mono text-sm transition-all duration-300 custom-scrollbar journal-crt-textarea ${systemAlert ? 'alert-mode' : ''}`}
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder={systemAlert ? "[CRITICAL LOG ENTRY: ENTER MANDATORY SYSTEM ANALYSIS...]" : "[TYPE_LOG_ENTRY_HERE...]"}
            disabled={isTransmitting}
          />
          {/* Decorative corner accents */}
          <div className={`absolute top-0 right-0 w-4 h-4 border-t border-r pointer-events-none transition-colors z-10 ${systemAlert ? 'border-red-500/40' : 'border-accent-primary/20'}`}></div>
          <div className={`absolute bottom-0 left-0 w-4 h-4 border-b border-l pointer-events-none transition-colors z-10 ${systemAlert ? 'border-red-500/40' : 'border-accent-primary/20'}`}></div>
          
          <div className="absolute bottom-4 right-4 text-[9px] text-text-dim/30 font-mono select-none pointer-events-none flex gap-4 z-10">
            <span>LEN: {entry.length}</span>
            <span className={systemAlert ? 'text-red-400 font-bold' : ''}>
              {systemAlert ? 'ALERT_LEVEL: 4' : 'SYS_STATUS: READY'}
            </span>
          </div>
        </div>
      </div>
      
      {/* Footer Controls */}
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="text-[10px] text-text-dim font-mono uppercase tracking-widest flex items-center gap-2">
            {systemAlert ? (
              <span className="alert-led"></span>
            ) : (
              <span className={`w-1.5 h-1.5 rounded-full ${isTransmitting ? 'bg-accent-primary animate-pulse' : 'bg-accent-secondary'}`}></span>
            )}
            {isTransmitting ? 'UP_LINKING' : systemAlert ? 'CRITICAL_STANDBY' : 'STATION_IDLE'}
          </div>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={handleClear}
            disabled={isTransmitting || !entry.trim()}
            className="text-[10px] text-text-dim hover:text-red-400 transition-colors uppercase tracking-widest font-bold px-3 py-2 border border-border/20 hover:border-red-400/40 rounded-sm disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            Clear
          </button>
          
          <button 
            onClick={handleCommit}
            disabled={isTransmitting || !entry.trim()}
            className={`journal-button font-bold text-[10px] tracking-[0.2em] uppercase cursor-pointer min-w-[140px] ${
              systemAlert ? 'border-red-500/50 text-red-400 hover:border-red-500 hover:bg-red-500/10 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)]' : ''
            } ${
              isTransmitting || !entry.trim() 
                ? 'opacity-40 cursor-not-allowed' 
                : 'hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {isTransmitting ? 'WRITING...' : systemAlert ? 'SECURE_SAVE' : 'SAVE_LOG'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default JournalEntry;