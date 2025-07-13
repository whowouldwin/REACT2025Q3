import React from 'react';
import type { Character } from '../api/rickAndMorty.ts';
import { Card } from './Card.tsx';

interface Props {
  data: Character[];
  loading: boolean;
  error: string | null;
}

export class ResultsList extends React.Component<Props> {
  render() {
    const { data, loading, error } = this.props;

    if (loading) return <div className="results">Loading...</div>;
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
