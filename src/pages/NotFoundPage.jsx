import React from "react";

/**
 * Minimal, clean 404 page
 * - Simple layout
 * - Light humor
 * - No extra logic or effects
 */
const NotFoundPage = () => {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.code}>404</div>

        <h1 style={styles.title}>Page not found</h1>

        <p style={styles.message}>
          Well… this is awkward. The page you’re looking for doesn’t exist.
        </p>

        <p style={styles.subtle}>
          It might have moved, been deleted, or never existed in the first place.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#0f172a",
    color: "#e5e7eb",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
    padding: "24px",
  },
  card: {
    textAlign: "center",
    maxWidth: "420px",
    padding: "40px",
    borderRadius: "12px",
    background: "#111827",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  code: {
    fontSize: "64px",
    fontWeight: "700",
    marginBottom: "12px",
  },
  title: {
    fontSize: "24px",
    marginBottom: "12px",
  },
  message: {
    opacity: 0.9,
    marginBottom: "8px",
  },
  subtle: {
    opacity: 0.6,
    fontSize: "14px",
  },
};