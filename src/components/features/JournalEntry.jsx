import { useState } from 'react';

function JournalEntry({ onLogCommitted }) {
  // Your original state remains untouched
  const [entry, setEntry] = useState("");
  const [isTransmitting, setIsTransmitting] = useState(false);

  const handleCommit = async () => {
    if (!entry.trim()) return; 
    
    setIsTransmitting(true);
    
    const payload = {
      note: entry,
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
        // Trigger the parent component's fetch function
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

  const addTag = (tag) => {
    setEntry(prev => prev ? `${prev} [${tag}]` : `[${tag}] `);
  };

  return (
    <div className="flex flex-col h-full w-full group">
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

      <div className="flex-1 relative mb-4">
        <textarea
          className="w-full h-full bg-bg-main text-text-main border border-border p-4 focus:border-accent-primary focus:shadow-[0_0_20px_var(--color-accent-glow)] outline-none resize-none font-mono text-sm transition-all duration-300 rounded-sm custom-scrollbar"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="[TYPE_LOG_ENTRY_HERE...]"
          disabled={isTransmitting}
        />
        {/* Decorative corner accents */}
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-accent-primary/20 pointer-events-none group-focus-within:border-accent-primary/60 transition-colors"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-accent-primary/20 pointer-events-none group-focus-within:border-accent-primary/60 transition-colors"></div>
        
        <div className="absolute bottom-4 right-4 text-[9px] text-text-dim/30 font-mono select-none pointer-events-none flex gap-4">
          <span>LEN: {entry.length}</span>
          <span>SYSTM_OVR: READY</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="text-[10px] text-text-dim font-mono uppercase tracking-widest flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${isTransmitting ? 'bg-accent-primary animate-pulse' : 'bg-accent-secondary'}`}></span>
            {isTransmitting ? 'UP_LINKING' : 'STATION_IDLE'}
          </div>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={handleClear}
            disabled={isTransmitting || !entry.trim()}
            className="text-[10px] text-text-dim hover:text-red-400 transition-colors uppercase tracking-widest font-bold px-3 py-2 border border-border/20 hover:border-red-400/40 rounded-sm disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Clear
          </button>
          
          <button 
            onClick={handleCommit}
            disabled={isTransmitting || !entry.trim()}
            className={`journal-button font-bold text-[10px] tracking-[0.2em] uppercase cursor-pointer min-w-[140px] ${
              isTransmitting || !entry.trim() 
                ? 'opacity-40 cursor-not-allowed' 
                : 'hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {isTransmitting ? 'WRITING...' : 'SAVE_LOG'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default JournalEntry;