import JournalEntry from '../components/features/JournalEntry';

function ResearchJournalPage() {
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
            <JournalEntry />
          </div>
        </div>

        {/* Right Column: Historical Data Vault - Adjusted to 60% */}
        <div className="w-full md:w-2/5 border border-border p-4 bg-bg-hover rounded-sm flex flex-col">
          <h2 className="section-label mb-2 shrink-0">Historical Archives</h2>
          <div className="flex-1 flex items-center justify-center text-text-dim border border-dashed border-border h-full">
            [AWAITING_FLASK_DATABASE_FETCH]
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResearchJournalPage;