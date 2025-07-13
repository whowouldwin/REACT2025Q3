import React from 'react';
import type { Character } from '../api/rickAndMorty.ts';
import { Card } from './Card.tsx';
import { SkeletonCard } from './SkeletonCard.tsx';

interface Props {
  data: Character[];
  loading: boolean;
  error: string | null;
  skeletonCount: number;
}

export class ResultsList extends React.Component<Props> {
  renderSkeletonCards() {
    const count = this.props.skeletonCount;
    return (
      <div className="card-grid">
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonCard key={`skeleton-${i}`} />
        ))}
      </div>
    );
  }
  render() {
    const { data, loading, error } = this.props;

    if (loading) return this.renderSkeletonCards();
    if (error) return <div className="error-message">{error}</div>;

    return (
      <div className="card-grid">
        {data.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>
    );
  }
}
