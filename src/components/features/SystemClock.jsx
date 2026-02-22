import React, { useEffect, useState } from 'react'

const DateClock = () => {

    // Holds the formatted date/time string shown in the UI
    const [date, setDate] = useState("");

    useEffect(() => {

        // Responsible ONLY for formatting current time
        const updateDate = () => {
            const now = new Date();

            /*
                Use Intl.DateTimeFormat instead of manual string building.
                Reasons:
                - Locale safe
                - Handles leading zeros automatically
                - More performant than repeated string ops
                - Easier to extend later
            */
            const formattedDate = new Intl.DateTimeFormat(undefined, {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            }).format(now);

            setDate(formattedDate);
        };

        // Run immediately so UI doesn't wait 1 second
        updateDate();

        // Update every second for a live clock
        const interval = setInterval(updateDate, 1000);

        // Prevent memory leaks when component unmounts
        return () => clearInterval(interval);

    }, []);

    return (
        <div className="flex items-center gap-2 border-l-2 border-hud-blue/30 pl-4 ml-4">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                Clock
            </span>

            {/* Render the live date/time */}
            <span className="text-lg font-mono text-hud-blue tracking-widest font-bold">
                {date}
            </span>
        </div>
    );
};

export default DateClock;
