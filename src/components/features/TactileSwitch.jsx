import React, { useState } from 'react';

export const TactileSwitch = ({
    label = 'POWER',
    accentColor = '#f59e0b',
    defaultOn = false,
    onToggle
}) => {
    const [isOn, setIsOn] = useState(defaultOn);

    const handleToggle = () => {
        const nextState = !isOn;
        setIsOn(nextState);
        if (onToggle) {
            onToggle(nextState);
        }
    };

    const ledStyle = isOn && accentColor ? {
        background: accentColor,
        borderColor: accentColor,
        boxShadow: `0 0 8px ${accentColor}, 0 0 16px ${accentColor}`
    } : {};

    return (
        <div className="tactile-switch-container">
            <button
                type="button"
                className={`tactile-switch-btn ${isOn ? 'is-active' : ''}`}
                onClick={handleToggle}
            >
                <span
                    className={`led-indicator ${isOn ? 'active' : ''}`}
                    style={ledStyle}
                />
                <span className="switch-label">{label}</span>
            </button>
        </div>
    );
};

export default TactileSwitch;
