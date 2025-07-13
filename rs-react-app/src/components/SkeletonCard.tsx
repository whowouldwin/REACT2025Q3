import React from 'react';

export class SkeletonCard extends React.Component {
  render() {
    return (
      <div className="card skeleton-card">
        <div className="skeleton-image"></div>
        <div className="card-content">
          <div className="skeleton-title"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text"></div>
        </div>
      </div>
    );
  }
}
