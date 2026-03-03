export default function ExperimentsPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-bold tracking-widest text-accent-primary uppercase">ACTIVE_TESTS // EXPERIMENTS</h1>
        <p className="text-text-dim text-xs mt-1">TOTAL_MODULES: 0 | MONITORING_ACTIVE: YES</p>
      </div>

      <div className="p-8 border-2 border-dashed border-border rounded-sm text-center">
        <h2 className="text-accent-secondary mb-2 font-mono tracking-widest uppercase">SCANNING_FOR_MODULES...</h2>
        <p className="text-text-dim text-sm">No active experiments detected in this sector. Deploy new modules to begin laboratory analysis.</p>
        
        <button className="journal-button mt-6 inline-flex mx-auto text-accent-primary uppercase font-bold text-xs">
          INITIATE_DEPLOYMENT
        </button>
      </div>
    </div>
  );
}