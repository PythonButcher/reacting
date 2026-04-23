import { useState, useEffect } from 'react';
import JournalEntry from '../components/features/JournalEntry';

function ResearchJournalPage() {
  const [archives, setArchives] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from our new Flask GET endpoint
  const fetchArchives = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/journal");
      if (response.ok) {
        const data = await response.json();
        if (data.status === "success") {
          setArchives(data.entries);
        }
      } else {
        console.error("FETCH_FAILED:", response.status);
      }
    } catch (error) {
      console.error("NETWORK_ERROR:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger the fetch exactly once when the component mounts
  useEffect(() => {
    fetchArchives();
  }, []);

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="border-b border-border pb-4 shrink-0">
        <h1 className="text-3xl font-bold tracking-widest text-accent-primary uppercase">RESEARCH_JOURNAL // LOGS</h1>
        <p className="text-text-dim text-xs mt-1">STATUS: RECORDING | DATA_VAULT: ACTIVE</p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 overflow-hidden">
        {/* Left Column: Data Entry - Widened to 40% */}
        <div className="w-full md:w-5/5 flex flex-col border border-border p-4 bg-bg-hover rounded-sm">
          <h2 className="section-label mb-2 shrink-0">New Entry Target</h2>
          <div className="flex-1 overflow-hidden">
            <JournalEntry onLogCommitted={fetchArchives} />
          </div>
        </div>

        {/* Right Column: Historical Data Vault */}
        <div className="w-full md:w-2/5 border border-border p-4 bg-bg-hover rounded-sm flex flex-col">
          <h2 className="section-label mb-2 shrink-0">Historical Archives</h2>
          
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {isLoading ? (
              <div className="flex items-center justify-center h-full text-text-dim border border-dashed border-border animate-pulse">
                [TRANSMITTING_ARCHIVES...]
              </div>
            ) : archives.length === 0 ? (
              <div className="flex items-center justify-center h-full text-text-dim border border-dashed border-border">
                [NO_ARCHIVES_FOUND]
              </div>
            ) : (
              archives.map((entry, index) => (
                <div key={index} className="bg-bg-main border border-border p-3 text-sm font-mono flex flex-col">
                  <span className="text-accent-primary text-xs mb-2 border-b border-border pb-1">
                    LOG_DATE: {new Date(entry.timestamp).toLocaleString()}
                  </span>
                  <span className="text-text-main whitespace-pre-wrap">
                    {entry.note}
                  </span>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default ResearchJournalPage;