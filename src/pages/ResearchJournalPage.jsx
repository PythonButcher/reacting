import { useState, useEffect } from 'react';
import JournalEntry from '../components/features/JournalEntry';
import ArchiveList from '../components/features/ArchiveList';

function ResearchJournalPage() {
  const [archives, setArchives] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchArchives = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/journal");
      if (response.ok) {
        const data = await response.json();
        if (data.status === "success") {
          setArchives(data.entries);
        }
      }
    } catch (error) {
      console.error("NETWORK_ERROR:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArchives();
  }, []);

// --- NEW: Deletion Handler ---
  const deleteEntry = async (timestamp) => {
    try {
      // Wrap the timestamp in encodeURIComponent to sanitize colons and special characters
      const response = await fetch(`http://127.0.0.1:8000/api/journal/${encodeURIComponent(timestamp)}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Instantly sync the UI by re-fetching the updated list
        fetchArchives();
      } else {
        console.error("DELETION_FAILED:", response.status);
      }
    } catch (error) {
      console.error("NETWORK_ERROR:", error);
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="border-b border-border pb-4 shrink-0">
        <h1 className="text-3xl font-bold tracking-widest text-accent-primary uppercase">RESEARCH_JOURNAL // LOGS</h1>
        <p className="text-text-dim text-xs mt-1">STATUS: RECORDING | DATA_VAULT: ACTIVE</p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 overflow-hidden">
        <div className="w-full md:w-3/5 flex flex-col border border-border p-6 bg-bg-hover/30 rounded-sm shadow-inner">
          <div className="flex justify-between items-center mb-4 shrink-0 border-l-2 border-accent-secondary pl-3">
            <h2 className="section-label">New Entry Target</h2>
            <span className="text-[9px] text-text-dim/50 font-mono uppercase tracking-[0.3em]">Module_v2.1</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <JournalEntry onLogCommitted={fetchArchives} />
          </div>
        </div>

        <div className="w-full md:w-2/5 border border-border p-6 bg-bg-hover/30 rounded-sm flex flex-col shadow-inner">
          <div className="flex justify-between items-center mb-4 shrink-0 border-l-2 border-accent-primary pl-3">
            <h2 className="section-label !text-accent-primary">Historical Archives</h2>
            <span className="text-[9px] text-text-dim/50 font-mono uppercase tracking-[0.3em]">Records_DB</span>
          </div>
          
          <ArchiveList 
            archives={archives} 
            isLoading={isLoading} 
            deleteEntry={deleteEntry} 
          />
        </div>
      </div>
    </div>
  );
}

export default ResearchJournalPage;