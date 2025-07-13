import React from 'react';

export class FallbackUI extends React.Component {
  render() {
    return (
      <div className="error-fallback">
        <h2>Something went wrong.</h2>
        <p>Please reload the page.</p>
      </div>
    );
  }
}
