import JournalEntry from '../components/features/JournalEntry';

function ResearchJournalPage() {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="border-b border-border pb-4 shrink-0">
        <h1 className="text-3xl font-bold tracking-widest text-accent-primary uppercase">RESEARCH_JOURNAL // LOGS</h1>
        <p className="text-text-dim text-xs mt-1">STATUS: RECORDING | DATA_VAULT: ACTIVE</p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 overflow-hidden">
        {/* Left Column: Data Entry */}
        <div className="w-full md:w-1/3 flex flex-col border border-border p-4 bg-bg-hover rounded-sm">
          <h2 className="section-label mb-4">New Entry Target</h2>
          <div className="flex-1">
            <JournalEntry />
          </div>
        </div>

        {/* Right Column: Historical Data Vault (Placeholder for future step) */}
        <div className="w-full md:w-2/3 border border-border p-4 bg-bg-hover rounded-sm flex flex-col">
          <h2 className="section-label mb-4">Historical Archives</h2>
          <div className="flex-1 flex items-center justify-center text-text-dim border border-dashed border-border">
            [AWAITING_FLASK_DATABASE_FETCH]
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResearchJournalPage;