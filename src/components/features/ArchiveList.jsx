import React from 'react';
import DeleteButton from '../buttons/DeleteButton';

const ArchiveList = ({ archives, isLoading, deleteEntry }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full text-text-dim border border-dashed border-border animate-pulse font-mono bg-bg-panel/20">
        [TRANSMITTING_ARCHIVES...]
      </div>
    );
  }

  if (archives.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-text-dim border border-dashed border-border font-mono bg-bg-panel/20 uppercase tracking-widest text-[10px]">
        [NO_ARCHIVES_FOUND]
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
      {archives.map((entry, index) => (
        <div 
          key={index} 
          className="bg-bg-main border border-border p-4 text-sm font-mono flex flex-col group transition-all duration-300 hover:border-accent-primary hover:shadow-[0_0_15px_var(--color-accent-glow)] relative overflow-hidden journal-panel"
        >
          {/* Decorative side indicator */}
          <div className="absolute top-0 left-0 w-[2px] h-full bg-accent-primary opacity-30 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="flex justify-between items-start border-b border-border pb-2 mb-3">
            <div className="flex flex-col">
              <span className="text-[9px] text-accent-secondary uppercase tracking-tighter opacity-70">Log_Sequence_Entry</span>
              <span className="text-accent-primary text-xs font-bold tracking-wider">
                {new Date(entry.timestamp).toLocaleString()}
              </span>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
              <DeleteButton 
                onClick={() => deleteEntry(entry.timestamp)} 
                label="[PURGE]" 
              />
            </div>
          </div>
          
          <div className="text-text-main whitespace-pre-wrap leading-relaxed relative pl-4">
            <span className="absolute left-0 text-accent-secondary opacity-50 font-bold select-none">{'>'}</span>
            {entry.note}
          </div>
          
          <div className="mt-4 pt-2 border-t border-border/10 flex justify-between items-center text-[8px] text-text-dim/40 uppercase tracking-[0.2em]">
            <span>Sec_Protocol: ENCRYPTED</span>
            <span>Vault_ID: {entry.timestamp ? entry.timestamp.split('-')[0] : 'UNKNOWN'}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArchiveList;
