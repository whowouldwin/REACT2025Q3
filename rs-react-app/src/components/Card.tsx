import React from 'react';
import type { Character } from '../api/rickAndMorty.ts';

export class Card extends React.Component<Character> {
  render() {
    const { name, status, species, image, gender } = this.props;
    return (
      <div className="card">
        <img src={image} alt={name} />
        <div className="card-content">
          <h3>{name}</h3>
          <p>
            {status} — {species}
          </p>
          <p>{gender}</p>
        </div>
      </div>
    );
  }
}
