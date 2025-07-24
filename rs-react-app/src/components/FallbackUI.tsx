import React from 'react';

export class FallbackUI extends React.Component {
  render() {
    return (
      <div className="max-w-2xl mx-auto my-8 p-8 bg-red-900/20 border-2 border-dashed border-red-500/50 rounded-lg text-center">
        <h2 className="text-2xl font-bold text-red-400 mb-4">
          Something went wrong.
        </h2>
        <p className="text-white mb-6">Please reload the page.</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Reload Page
        </button>
      </div>
    );
  }
}
