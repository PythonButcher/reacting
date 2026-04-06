import React from 'react';
import { useFetchFlask } from '../../hooks/useFlaskFetch';
import DetailRow from './DetailRow';

const BackendProjectStats = () => {
    const { data, loading, error } = useFetchFlask('http://127.0.0.1:8000/api/stats');
    const status = loading ? 'CONNECTING...' : error ? 'OFFLINE' : 'LINK_ESTABLISHED';
      
    const stats = data?.project_stats;

    return (
      <div className="border border-border p-4 bg-bg-hover rounded-sm">
        <h2 className="section-label mb-2">Project Information</h2>

        <div className="space-y-2 font-mono text-xs">

          <div className="flex justify-between">
            <span className="text-text-dim">CONNECTION:</span>
            <span className={status === 'OFFLINE' ? 'text-red-500' : 'text-accent-primary'}>
              {status}
            </span>
          </div>

          {stats ? (
            <>
            <DetailRow label="TOTAL_FILES:" value={stats.total_files} />
            <DetailRow label="DIRECTORIES:" value={stats.total_directories} />
            <DetailRow label="PROJECT_SIZE_MB:" value={(stats.total_size_bytes / 1024 / 1024).toFixed(2)} />
            <DetailRow label="MAX_DEPTH:" value={stats.max_directory_depth} />
            <DetailRow label="LARGEST_FILES:" />

              {stats?.largest_files?.slice(0, 3).map((file) => (
                <div key={file.path} className="flex justify-between">
                  <span className="text-text-dim">{file.path}</span>
                  <span className="text-text-main">
                    {(file.size_bytes / 1024).toFixed(1)} KB
                  </span>
                </div>
              ))}
            </>
          ) : error ? (
            <div className="mt-2 p-2 bg-red-900/20 border border-red-500/50 text-red-400">
              Backend unreachable: {error.message}
            </div>
          ) : loading ? (
            <div className="animate-pulse text-text-dim">AWAITING_DATA...</div>
          ) : null}

        </div>
      </div>
    );
}

export default BackendProjectStats;