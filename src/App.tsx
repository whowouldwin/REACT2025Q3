import './App.css';
import { type FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import About from './pages/About';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { useCharacterData } from './utils/hooks/useCharacterData';

import { MainLayout } from '@/app/layouts/main/MainLayout';

export const App: FC = () => {
  const characterData = useCharacterData();

  return (
    <Routes>
      <Route
        path="/"
        element={<MainLayout handleSearch={characterData.handleSearch} />}
      >
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
