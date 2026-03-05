import BackendData from '../components/features/BackendData';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-bold tracking-widest text-accent-primary uppercase">DASHBOARD // HOME_BASE</h1>
        <p className="text-text-dim text-xs mt-1">STATUS: OPERATIONAL | SECURE_CONNECTION: ESTABLISHED</p>
      </div>

      <div className="space-y-4 text-text-main leading-relaxed">
        <p className="font-mono text-sm">
          Welcome to the central command for React experiments. This terminal serves as the entry point for all active testing modules.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* This component connects to your Python backend */}
          <BackendData />

          <div className="border border-border p-4 bg-bg-hover rounded-sm">
            <h2 className="section-label mb-2">System_Brief</h2>
            <p className="text-sm text-text-dim">Notebook dedicated to React Programming and Laboratory testing.</p>
          </div>
          <div className="border border-border p-4 bg-bg-hover rounded-sm">
            <h2 className="section-label mb-2">Terminal_Log</h2>
            <p className="text-sm text-text-dim">Last Access: Tuesday, March 3, 2026. All systems nominal.</p>
          </div>
          <div className="border border-border p-4 bg-bg-hover rounded-sm">
            <h2 className="section-label mb-2">Project Meta Data</h2>
            <p className="text-sm text-text-dim">Placeholder for now.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
