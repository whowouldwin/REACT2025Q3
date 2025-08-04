import React from 'react';

export const FallbackUI: React.FC = () => {
  return (
    <div
      className="max-w-2xl mx-auto my-8 p-8 border-2 border-dashed rounded-lg text-center"
      style={{
        backgroundColor: 'var(--error-boundary-bg)',
        borderColor: 'var(--error-boundary-border)',
      }}
    >
      <h2
        className="text-2xl font-bold mb-4"
        style={{ color: 'var(--error-boundary-text)' }}
      >
        Something went wrong.
      </h2>
      <p className="mb-6" style={{ color: 'var(--text-primary)' }}>
        Please reload the page.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="btn btn-danger"
      >
        Reload Page
      </button>
    </div>
  );
};
