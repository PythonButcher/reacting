import React from 'react';
import { useFetchFlask } from '../../hooks/useFlaskFetch';
import DetailRow from './DetailRow';


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
                    <>
                    <DetailRow label="CITY:" value={data.name} />
                    <DetailRow label="Region:" value={data.region} />
                    <DetailRow label="Current Time:" value={data.localtime} />
                    <DetailRow label="Temperature:" value={data.temp_f + "°F"} />
        
                    
                  </>
                )}
             
            </div>
        </div>
    );
};

export default WeatherUpdate;
