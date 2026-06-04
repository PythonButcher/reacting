import React from 'react';

/**
 * Reusable PageHeader component for the retro-laboratory theme.
 * Handles DRY best practices across dashboard, tests, journals, and vault pages.
 * 
 * @param {Object} props
 * @param {string} props.title - The main page header title.
 * @param {string} [props.statusText] - The sub-heading status telemetry.
 * @param {string} [props.className] - Additional wrapper class overrides.
 * @param {React.ReactNode} [props.children] - Right-hand side action elements.
 */
export default function PageHeader({ title, statusText, className = '', children }) {
  return (
    <div className={`border-b border-border pb-4 flex justify-between items-center shrink-0 ${className}`}>
      <div>
        <h1 className="text-3xl font-bold tracking-widest text-accent-primary uppercase">
          {title}
        </h1>
        {statusText && (
          <p className="text-text-dim text-xs mt-1.5 flex items-center gap-2 font-mono">
            {/* Blinking isotope green indicator LED */}
            <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary shadow-[0_0_6px_var(--color-accent-secondary)] animate-pulse shrink-0" />
            {statusText}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}