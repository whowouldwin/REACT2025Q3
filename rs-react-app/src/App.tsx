import './App.css';
import React from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';

import { MainLayout } from './components/MainLayout';
import { useCharacterData } from './hooks/useCharacterData';
import About from './pages/About';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

export const App: React.FC = () => {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const characterData = useCharacterData(currentPage);

  return (
    <Routes>
      <Route
        path="/"
        element={<MainLayout handleSearch={characterData.handleSearch} />}
      >
        <Route index element={<Home characterData={characterData} />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
