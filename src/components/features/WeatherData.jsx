import React from 'react';
import { useFetchFlask } from '../../hooks/useFlaskFetch';

const WeatherUpdate = () => {
    console.log("Here is the data{data}")
    const { data, loading, error } = useFetchFlask('http://127.0.0.1:8000/api/weather');
    const get_status = loading ? 'CONNECTING...' : error ? 'OFFLINE' : 'LINK_ESTABLISHED';

    return (
        <div className="border border-border p-4 bg-bg-hover rounded-sm">
            <h2 className="section-label mb-2">Local Weather</h2>

            <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                    <span className="text-text-dim">CONNECTION:</span>
                    <span className={get_status === 'OFFLINE' ? 'text-red-500' : 'text-accent-primary'}>
                        {get_status}
                    </span>
                </div>
                
                {data && !error && (
                    <div className="flex justify-between">
                        <span className="text-text-dim">CITY:</span>
                        <span className="text-text-main">{data.name}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WeatherUpdate;
