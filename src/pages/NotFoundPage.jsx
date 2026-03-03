import React from "react";
import { Link } from "react-router-dom";

/**
 * Updated 404 page for LAB_TERMINAL theme
 */
const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-main p-6 font-mono">
      <div className="journal-panel max-w-md text-center">
        <div className="text-6xl font-bold mb-4 text-accent-primary accent-pulse">404</div>

        <h1 className="text-2xl mb-4 text-accent-secondary tracking-widest uppercase">ERROR: SECTION_NOT_FOUND</h1>

        <p className="text-text-main mb-4 opacity-90">
          Well… this is awkward. The memory segment you’re looking for doesn’t exist or has been deallocated.
        </p>

        <p className="text-text-dim text-sm mb-8">
          [!] Status: INVALID_ADDRESS_EXCEPTION
        </p>

        <Link to="/" className="journal-button inline-flex no-underline text-accent-primary">
          REBOOT_TO_DASHBOARD
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;