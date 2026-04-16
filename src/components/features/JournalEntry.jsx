import { useState } from 'react'; 

function JournalEntry() {
    const [entry, setEntry] = useState("");

    const handleCommit = () => {
        // Flask Backend payload staging
        console.log("TRANSMITTING_PAYLOAD:", { note:entry, timestamp: new Date().toISOString() });
        setEntry(""); // Clear terminal after commit
    };

    return (
    <div className="flex flex-col h-full">
      <textarea
        className="flex-1 w-full min-h-[120px] bg-bg-main text-text-main border border-border p-3 focus:border-accent-primary outline-none resize-none font-mono text-sm mb-3"
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="INPUT_OBSERVATION_DATA..."
      />
      <button 
        onClick={handleCommit}
        className="self-end px-4 py-2 bg-border text-text-main hover:bg-accent-primary hover:text-bg-main font-bold text-xs tracking-widest transition-colors uppercase cursor-pointer"
      >
        Commit_Log
      </button>
    </div>
  );
}

export default JournalEntry;