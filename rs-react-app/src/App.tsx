import './App.css';
import React from 'react';

import { Header } from './components/Header';
import { MainContent } from './components/MainContent';
import { useCharacterData } from './hooks/useCharacterData';

export const App: React.FC = () => {
  const {
    characters,
    loading,
    error,
    page,
    totalPages,
    lastCount,
    crash,
    handleSearch,
    handlePrev,
    handleNext,
    triggerCrash,
  } = useCharacterData();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header onSearch={handleSearch} />
      <MainContent
        characters={characters}
        loading={loading}
        error={error}
        lastCount={lastCount}
        page={page}
        totalPages={totalPages}
        crash={crash}
        onPrev={handlePrev}
        onNext={handleNext}
        onCrash={triggerCrash}
      />
    </div>
  );
};

export default App;
