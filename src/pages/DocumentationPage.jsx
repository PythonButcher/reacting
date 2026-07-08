import PageHeader from '../components/menu/PageHeader';

export default function DocumentationPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="DOCUMENTATION // RESOURCES"
        statusText="LIBRARY_ACCESS: AUTHORIZED | DATA_INTEGRITY: HIGH"
      />

      <div className="space-y-4">
        <p className="font-mono text-sm text-text-main">
          Reference laboratory documentation and high-quality React resources. All entries have been vetted for system compatibility.
        </p>

        <div className="space-y-2">
           <div className="p-4 bg-bg-hover border border-border rounded-sm flex justify-between items-center group cursor-pointer hover:border-accent-secondary transition-colors">
              <span className="text-sm font-bold text-accent-secondary">REACT_19_DOCS</span>
              <span className="text-xs text-text-dim group-hover:text-accent-secondary">READ_MORE_&gt;</span>
           </div>
           <div className="p-4 bg-bg-hover border border-border rounded-sm flex justify-between items-center group cursor-pointer hover:border-accent-secondary transition-colors">
              <span className="text-sm font-bold text-accent-secondary">VITE_COMMAND_REF</span>
              <span className="text-xs text-text-dim group-hover:text-accent-secondary">READ_MORE_&gt;</span>
           </div>
           <div className="p-4 bg-bg-hover border border-border rounded-sm flex justify-between items-center group cursor-pointer hover:border-accent-secondary transition-colors">
              <span className="text-sm font-bold text-accent-secondary">TAILWIND_V4_THEME</span>
              <span className="text-xs text-text-dim group-hover:text-accent-secondary">READ_MORE_&gt;</span>
           </div>
        </div>
      </div>
    </div>
  );
}