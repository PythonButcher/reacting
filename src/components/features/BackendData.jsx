import React, { useState, useEffect } from 'react';
import { useFetchFlask } from '../../hooks/useFlaskFetch';

const BackendData = () => {
    const { data, loading, error } = useFetchFlask('http://127.0.0.1:8000/api/data');
    const status = loading ? 'CONNECTING...' : error ? 'OFFLINE' : 'LINK_ESTABLISHED';

  return (
    <div className="border border-border p-4 bg-bg-hover rounded-sm">
      <h2 className="section-label mb-2">System_Telemetry</h2>
      <div className="space-y-2 font-mono text-xs">
        <div className="flex justify-between">
          <span className="text-text-dim">CONNECTION:</span>
          <span className={status === 'OFFLINE' ? 'text-red-500' : 'text-accent-primary'}>
            {status}
          </span>
        </div>
        
        {data ? (
          <>
            <div className="flex justify-between">
              <span className="text-text-dim">NODE_NAME:</span>
              <span className="text-text-main">{data.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-dim">UPLINK_STATUS:</span>
              <span className="text-text-main text-right">{data.details}</span>
            </div>
          </>
        ) : error ? (
          <div className="mt-2 p-2 bg-red-900/20 border border-red-500/50 text-red-400">
            [!] ERROR: Backend server at port 8000 is unreachable. 
            Ensure `python main.py` is running in the /backend directory.
          </div>
        ) : (
          <div className="animate-pulse text-text-dim">AWAITING_DATA...</div>
        )}
      </div>
    </div>
  );
};

export default BackendData;
