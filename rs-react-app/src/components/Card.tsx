import React from 'react';
import type { Character } from '../api/rickAndMorty.ts';

export class Card extends React.Component<Character> {
  render() {
    const { name, status, species, image, gender } = this.props;
    return (
      <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:translate-y-[-4px] w-full max-w-xs">
        <img src={image} alt={name} className="w-full h-64 object-cover" />
        <div className="p-4">
          <h3 className="text-xl font-bold text-white mb-2 truncate">{name}</h3>
          <p className="text-gray-300 mb-1 flex items-center">
            <span
              className={`inline-block w-2 h-2 rounded-full mr-2 ${
                status === 'Alive'
                  ? 'bg-green-500'
                  : status === 'Dead'
                    ? 'bg-red-500'
                    : 'bg-gray-500'
              }`}
            ></span>
            {status} — {species}
          </p>
          <p className="text-gray-400">{gender}</p>
        </div>
      </div>
    );
  }
}
