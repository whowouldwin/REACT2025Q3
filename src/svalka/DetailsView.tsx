import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getCharacterById } from '../utils/api/rickAndMorty.ts';
import CloseIcon from '../assets/icons/CloseIcon.tsx';
import { useLockBodyScrollOnMobile } from '../utils/hooks/useLockBodyScrollOnMobile.ts';
import { twMerge } from 'tailwind-merge';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

export const DetailsView: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const detailsId = searchParams.get('details');
  const [loading, setLoading] = useState(false);
  const [character, setCharacter] = useState<Character | null>(null);
  const [, setPendingCharacter] = useState<Character | null>(null);
  useLockBodyScrollOnMobile(!!detailsId);

  useEffect(() => {
    if (!detailsId) return;

    setLoading(true);

    getCharacterById(detailsId)
      .then((data) => {
        setPendingCharacter(data);
        setCharacter(data);
      })
      .catch(() => {
        setPendingCharacter(null);
        setCharacter(null);
      })
      .finally(() => setLoading(false));
  }, [detailsId]);

  const handleClose = () => {
    searchParams.delete('details');
    setSearchParams(searchParams);
  };

  if (!detailsId) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 lg:static lg:bg-transparent p-4 lg:p-0"
      onClick={handleOverlayClick}
    >
      <aside
        className={twMerge(
          'w-full max-w-md lg:w-full ',
          'p-6 rounded-lg shadow-xl relative border',
          "bg-secondary "
        )}
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-color)',
        }}
      >
        {loading && (
          <div className="absolute top-0 left-0 right-0 flex justify-center">
            <div
              className="w-8 h-1 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--accent-color)' }}
            ></div>
          </div>
        )}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-all transform hover:scale-105 hover:brightness-110 hover:shadow-md cursor-pointer"
          aria-label="Close details"
          style={{
            backgroundColor: 'var(--error-boundary-color)',
            color: 'var(--text-primary)',
          }}
        >
          <CloseIcon />
        </button>

        {character ? (
          <div style={{ color: 'var(--text-primary)', paddingTop: '1.5rem' }}>
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: 'var(--accent-color)' }}
            >
              {character.name}
            </h2>
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={character.image}
                alt={character.name}
                className="rounded-lg mb-4 w-full md:w-48 object-cover shadow-lg border"
                style={{ borderColor: 'var(--border-color)' }}
              />
              <div className="flex-1">
                <div
                  className="p-4 rounded-lg mb-4"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                >
                  <p className="mb-2">
                    <span
                      style={{
                        color: 'var(--text-secondary)',
                        fontWeight: 500,
                      }}
                    >
                      Status:
                    </span>
                    <span
                      className={`${character.status === 'Alive' ? 'text-green-400' : character.status === 'Dead' ? 'text-red-400' : 'text-yellow-400'}`}
                    >
                      {character.status}
                    </span>
                  </p>
                  <p>
                    <span
                      style={{
                        color: 'var(--text-secondary)',
                        fontWeight: 500,
                      }}
                    >
                      Species:{' '}
                    </span>
                    <span style={{ color: 'var(--accent-color)' }}>
                      {character.species}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : loading && !character ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div
              className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mb-4"
              style={{
                borderColor: 'var(--accent-color)',
                borderTopColor: 'transparent',
              }}
            ></div>
            <p
              className="font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              Loading character details...
            </p>
          </div>
        ) : (
          <div
            className="rounded-lg p-6 text-center border"
            style={{
              backgroundColor: 'var(--error-boundary-bg)',
              borderColor: 'var(--error-boundary-border)',
              color: 'var(--error-boundary-text)',
            }}
          >
            <h3 className="text-xl font-bold mb-2">Not Found</h3>
            <p style={{ color: 'var(--text-primary)' }}>
              Character information could not be loaded.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
};
