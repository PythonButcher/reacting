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

  return (
    <div className="flex flex-col h-full w-full">
      <textarea
        className="flex-1 w-full h-full bg-bg-main text-text-main border border-border p-3 focus:border-accent-primary outline-none resize-none font-mono text-sm mb-4"
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="INPUT_OBSERVATION_DATA..."
        disabled={isTransmitting}
      />
      <button 
        onClick={handleCommit}
        disabled={isTransmitting || !entry.trim()}
        className={`shrink-0 self-end px-4 py-2 font-bold text-xs tracking-widest transition-colors uppercase cursor-pointer ${
          isTransmitting || !entry.trim() 
            ? 'bg-bg-hover text-text-dim cursor-not-allowed' 
            : 'bg-border text-text-main hover:bg-accent-primary hover:text-bg-main'
        }`}
      >
        {isTransmitting ? 'Transmitting...' : 'Commit_Log'}
      </button>
    </div>
  );
}

export default JournalEntry;