import React from 'react';

export const FallbackUI: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto my-8 p-8 bg-red-900/20 border-2 border-dashed border-red-500/50 rounded-lg text-center">
      <h2 className="text-2xl font-bold text-red-400 mb-4">
        Something went wrong.
      </h2>
      <p className="text-white mb-6">Please reload the page.</p>
      <button
        onClick={() => window.location.reload()}
        className="btn btn-danger"
      >
        Reload Page
      </button>
    </div>
  );
};
