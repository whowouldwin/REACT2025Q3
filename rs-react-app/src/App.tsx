import './App.css';
import React from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';

import { Header } from './components/Header';
import { useCharacterData } from './hooks/useCharacterData';
import About from './pages/About';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

export const App: React.FC = () => {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const characterData = useCharacterData(currentPage);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header handleSearch={characterData.handleSearch} />
      <Routes>
        <Route path="/" element={<Home characterData={characterData} />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
